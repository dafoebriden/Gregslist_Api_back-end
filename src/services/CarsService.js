import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CarsService {


    async getCars() {
        // NOTE dbContext allows us to communicate with our database. Cars is the collection in our database we are accessing. find is the mongoose method to query and retrieve data from our collection. If you don't pass an argument to find, it returns all "documents" from the database. find also returns an array
        const cars = await dbContext.Cars.find()
        return cars
    }
    async createCar(carData) {
        // NOTE create will add a document to our database using a javascript object. in this case, we pass through the request body and mongoose uses our schema for validation. create returns the newly created piece of data with additional properties (_id, createdAt, __v, etc)
        const car = await dbContext.Cars.create(carData)
        return car
    }

    async getCarById(carId) {
        const car = await dbContext.Cars.findById(carId)

        if (!car) {
            throw new BadRequest(`No car found with id of ${carId}`)
        }

        return car
    }

    async updateCar(carId, carData) {
        // const car = await dbContext.Cars.findByIdAndUpdate(carId, carData)

        // const carToUpdate = dbContext.Cars.findById(carId)

        const carToUpdate = await this.getCarById(carId)

        // carToUpdate.make = carData.make


        carToUpdate.imgUrl = carData.imgUrl || carToUpdate.imgUrl

        carToUpdate.price = carData.price == undefined ?
            carToUpdate.price
            :
            carData.price


        carToUpdate.hasSalvagedTitle = carData.hasSalvagedTitle == undefined ?
            carToUpdate.hasSalvagedTitle
            :
            carData.hasSalvagedTitle

        await carToUpdate.save()

        return carToUpdate
    }

    async destroyCar(carId) {
        // await dbContext.Cars.findByIdAndDelete(carId)
        const carToDestroy = await this.getCarById(carId)

        await carToDestroy.deleteOne()

        return `${carToDestroy.make} ${carToDestroy.model} has been destroyed!`
    }

}

export const carsService = new CarsService()