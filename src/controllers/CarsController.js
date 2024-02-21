import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
    constructor() {
        super('api/cars')
        this.router
            .get('', this.getCars)
            .post('', this.createCar)
            .get('/:carId', this.getCarById)
            .put('/:carId', this.updateCar)
            .delete('/:carId', this.destroyCar)
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async getCars(request, response, next) {
        try {
            const cars = await carsService.getCars()
            response.send(cars)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async createCar(request, response, next) {
        try {
            const carData = request.body
            const car = await carsService.createCar(carData)
            response.send(car)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */

    async getCarById(request, response, next) {
        try {
            const carId = request.params.carId
            const car = await carsService.getCarById(carId)
            response.send(car)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async updateCar(request, response, next) {
        try {
            const carId = request.params.carId
            const carData = request.body
            const car = await carsService.updateCar(carId, carData)
            response.send(car)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async destroyCar(request, response, next) {
        try {
            const carId = request.params.carId
            const message = await carsService.destroyCar(carId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
}