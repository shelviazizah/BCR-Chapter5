const carRepository = require("../repositories/carRepository");
const { cloudinary } = require("./../../cloudinary");

module.exports = {
  async createCar(req) {
    const { nama, price, ukuran, image } = req.body || {};
    const { id } = req.user || {};

    if (!nama || !price || !ukuran || !req.file || !req.file.path) {
      return {
        data: null,
        message: "Complete your input!",
        status: "Failed"
      }
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newCar = await carRepository.create({ nama, price, ukuran, image: result.url, createdBy: id });
    if (nama || price || ukuran || image) {
      return {
        data: newCar,
        status: "Success"
      }
    }

    module.exports = { createCar }
  },

  async updateCar(idCar, req) {
    const { nama, price, ukuran } = req.body || {};
    const { id } = req.user || {};

    if (!nama || !price || !ukuran || !req.file || !req.file.path) {
      return {
        data: null,
        message: "Complete your input!",
        status: "Failed"
      }
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const updatedCar = carRepository.update(idCar, { nama, price, ukuran, image: result.url, updatedBy: id });
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

  // async get(req, res, next) {
  //   try {
  //     const id = req.params.id;
  //     const carPayLoad = await carService.get(id);

  //     if (!carPayload) {
  //       res.status(404).json({
  //         status: "FAIL",
  //         message: `car not found!`,
  //       });
  //       return;
  //     }

  //     req.car = carPayload;

  //     next();

  //     return {
  //       data: cars
  //     };
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  get(id) {
    return carRepository.find(id);
  },
};
