import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getHouses)
            .post('', this.createHouse)
            .get('/:houseId', this.getHouseById)
            .put('/:houseId', this.updateHouse)
            .delete('/:houseId', this.destroyHouse)
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async getHouses(request, response, next) {
        try {
            const Houses = await housesService.getHouses()
            response.send(Houses)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async createHouse(request, response, next) {
        try {
            const houseData = request.body
            const House = await housesService.createHouse(houseData)
            response.send(House)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */

    async getHouseById(request, response, next) {
        try {
            const houseId = request.params.houseId
            const House = await housesService.getHouseById(houseId)
            response.send(House)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async updateHouse(request, response, next) {
        try {
            const houseId = request.params.houseId
            const houseData = request.body
            const House = await housesService.updateHouse(houseId, houseData)
            response.send(House)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async destroyHouse(request, response, next) {
        try {
            const houseId = request.params.houseId
            const message = await housesService.destroyHouse(houseId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
}