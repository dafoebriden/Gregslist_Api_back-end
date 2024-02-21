import { Schema } from "mongoose";

export const CarSchema = new Schema(
    {
        make: { type: String, required: true, maxLength: 25, minLength: 3 },
        model: { type: String, required: true, maxLength: 100, minLength: 1 },
        year: { type: Number, required: true, min: 1900, max: 2025 },
        price: { type: Number, required: true, min: 0, max: 1000000 },
        color: { type: String, maxLength: 7 },
        imgUrl: { type: String, required: true, minLength: 10, maxLength: 1000 },
        hasSalvagedTitle: { type: Boolean, required: true, default: false }
    },
    {
        // timestamps: true,
        toJSON: { virtuals: true }
    }
)