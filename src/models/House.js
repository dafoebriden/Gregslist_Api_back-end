import { Schema } from "mongoose";


const address = new Schema(
    {
        street: { type: String, required: true, maxLength: 25, minLength: 3 },
        apartmentNumber: { type: String, minlength: 0, maxLength: 5 },
        city: { type: String, required: true, maxLength: 25, minLength: 3 },
        state: { type: String, required: true, enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'], maxLength: 2, minLength: 2 },
        zip: { type: String, required: true, min: 6, max: 6 }
        // QUESTION limiting numbers            
    }
)
const area = new Schema(
    {
        squareFootage: { type: Number, required: true, min: 50, max: 25000 },
        acreage: { type: Number, required: true, min: .001, max: 10000 }
    }
)
const spaces = new Schema(
    {
        bedrooms: { type: Number, required: true, min: .5, max: 25 },
        bathrooms: { type: Number, required: true, min: .5, max: 25 },
        // Question numbers divisible by .5
        // mongoose validators
        playrooms: { type: Number, min: 0, max: 25 },
        movierooms: { type: Number, min: 0, max: 25 },
        garageSpaces: { type: Number, min: 0, max: 25 },
        library: { type: Boolean },
        backyard: { type: Boolean },
        porch: { type: Boolean },
        garden: { type: Boolean }
    }
)
const details = new Schema(
    {
        fireplaces: { type: Number, min: 0, max: 5 },
        fridge: { type: Boolean },
        freezer: { type: Boolean },
        washer: { type: Boolean },
        dryer: { type: Boolean },
        furnished: { type: Boolean },
    }
)


export const HouseSchema = new Schema(
    {
        address,
        year: { type: Number, required: true, min: 1900, max: 2025 },
        price: { type: Number, required: true, min: 0, max: 10000000 },
        color: { type: String, maxLength: 7 },
        imgUrl: { type: String, required: true, minLength: 10, maxLength: 1000 },
        spaces,
        area,
        details

    },
    {
        // timestamps: true,
        toJSON: { virtuals: true }
    }
)