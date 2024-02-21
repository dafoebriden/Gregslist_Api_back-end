import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class HousesService {


    async getHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }
    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }

    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)

        if (!house) {
            throw new BadRequest(`No house found with id of ${houseId}`)
        }

        return house
    }

    async updateHouse(houseId, houseData) {

        const houseToUpdate = await this.getHouseById(houseId)

        houseToUpdate.owner = houseData.owner == undefined ? houseToUpdate.owner : houseData.owner

        // houseToUpdate.address = houseData.address == undefined ? houseToUpdate.address : houseData.address
        if (houseData.address) {
            houseToUpdate.address.street = houseData.address.street == undefined ? houseToUpdate.address.street : houseData.address.street
            houseToUpdate.address.apartmentNumber = houseData.address.apartmentNumber == undefined ? houseToUpdate.address.apartmentNumber : houseData.address.apartmentNumber
            houseToUpdate.address.city = houseData.address.city == undefined ? houseToUpdate.address.city : houseData.address.city
            houseToUpdate.address.state = houseData.address.state == undefined ? houseToUpdate.address.state : houseData.address.state
            houseToUpdate.address.zip = houseData.address.zip == undefined ? houseToUpdate.address.zip : houseData.address.zip

        }

        houseToUpdate.year = houseData.year == undefined ? houseToUpdate.year : houseData.year

        houseToUpdate.price = houseData.price == undefined ? houseToUpdate.price : houseData.price

        houseToUpdate.imgUrl = houseData.imgUrl || houseToUpdate.imgUrl


        // houseToUpdate.spaces = houseData.spaces == undefined ? houseToUpdate.spaces : houseData.spaces
        if (houseData.spaces) {
            houseToUpdate.spaces.bedrooms = houseData.spaces.bedrooms == undefined ? houseToUpdate.spaces.bedrooms : houseData.spaces.bedrooms
            houseToUpdate.spaces.bathrooms = houseData.spaces.bathrooms == undefined ? houseToUpdate.spaces.bathrooms : houseData.spaces.bathrooms
            houseToUpdate.spaces.playrooms = houseData.spaces.playrooms == undefined ? houseToUpdate.spaces.playrooms : houseData.spaces.playrooms
            houseToUpdate.spaces.movierooms = houseData.spaces.movierooms == undefined ? houseToUpdate.spaces.movierooms : houseData.spaces.movierooms
            houseToUpdate.spaces.garageSpaces = houseData.spaces.garageSpaces == undefined ? houseToUpdate.spaces.garageSpaces : houseData.spaces.garageSpaces
            houseToUpdate.spaces.garden = houseData.spaces.garden == undefined ? houseToUpdate.spaces.garden : houseData.spaces.garden
            houseToUpdate.spaces.library = houseData.spaces.library == undefined ? houseToUpdate.spaces.library : houseData.spaces.library
            houseToUpdate.spaces.backyard = houseData.spaces.backyard == undefined ? houseToUpdate.spaces.backyard : houseData.spaces.backyard
            houseToUpdate.spaces.porch = houseData.spaces.porch == undefined ? houseToUpdate.spaces.porch : houseData.spaces.porch
            houseToUpdate.spaces.levels = houseData.spaces.levels == undefined ? houseToUpdate.spaces.levels : houseData.spaces.levels
        }

        // houseToUpdate.area = houseData.area == undefined ? houseToUpdate.area : houseData.area
        if (houseData.area) {
            houseToUpdate.area.acreage = houseData.area.acreage == undefined ? houseToUpdate.area.acreage : houseData.area.acreage
            houseToUpdate.area.squareFootage = houseData.area.squareFootage == undefined ? houseToUpdate.area.squareFootage : houseData.area.squareFootage
        }

        // houseToUpdate.details = houseData.details == undefined ? houseToUpdate.details : houseData.details
        if (houseData.details) {
            houseToUpdate.details.dryer = houseData.details.dryer == undefined ? houseToUpdate.details.dryer : houseData.details.dryer
            houseToUpdate.details.fireplaces = houseData.details.fireplaces == undefined ? houseToUpdate.details.dryer : houseData.details.dryer
            houseToUpdate.details.freezer = houseData.details.freezer == undefined ? houseToUpdate.details.dryer : houseData.details.dryer
            houseToUpdate.details.fridge = houseData.details.fridge == undefined ? houseToUpdate.details.dryer : houseData.details.dryer
            houseToUpdate.details.furnished = houseData.details.furnished == undefined ? houseToUpdate.details.dryer : houseData.details.dryer
            houseToUpdate.details.washer = houseData.details.washer == undefined ? houseToUpdate.details.dryer : houseData.details.dryer
        }
        houseToUpdate.description = houseData.description == undefined ? houseToUpdate.description : houseData.description

        await houseToUpdate.save()
        return houseToUpdate
    }

    async destroyHouse(houseId) {
        // await dbContext.Houses.findByIdAndDelete(houseId)
        const houseToDestroy = await this.getHouseById(houseId)

        await houseToDestroy.deleteOne()

        return `${houseToDestroy._id} ${houseToDestroy.address} has been destroyed!`
    }

}

export const housesService = new HousesService()