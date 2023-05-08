// const { request } = require("express");
const carRepository = require("../repositories/carRepository");
// const user = require("../models/user");

module.exports = {
  async createCar(req) {
    const { nama, price, ukuran, image } = req.body || {};
    const { id } = req.user || {};

    if (!nama || !price || !ukuran || !image) {
      return {
        data: null,
        message: "Complete your input!",
        status: "Failed"
      }
    }

    newCar = await carRepository.create({ nama, price, ukuran, image, createdBy: id });
    if (nama || price || ukuran || image) {
      return {
        data: newCar,
        status: "Success"
      }
    }
  },

  async updateCar(idCar, req) {
    const { nama, price, ukuran, image } = req.body || {};
    const { id } = req.user || {};

    if (!nama || !price || !ukuran || !image) {
      return {
        data: null,
        message: "Complete your input!",
        status: "Failed"
      }
    }

    updatedCar = await carRepository.update(idCar, { nama, price, ukuran, image, updatedBy: id });
    if (nama || price || ukuran || image) {
      return {
        data: updatedCar,
        status: "Success"
      }
    }
  },

  async deleteCar(carId, deletedBy) {
    try {
      await carRepository.updateCar(carId, { deletedBy });
      return await carRepository.delete(carId);
    } catch (error) {
      return {
        message: ("Error delete Cars")
      }
    }
  },

  async list() {
    try {
      const cars = await carRepository.findAll();
      const carCount = await carRepository.getTotalCars();

      return {
        data: cars,
        count: carCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return carRepository.find(id);
  },
};
