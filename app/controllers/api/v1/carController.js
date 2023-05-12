/**
 * @file contains request handler of car resource
 * @author Shelvi Azizah
 */
const cars = require("../../../models/cars");
const carService = require("../../../services/carService");

module.exports = {
  list(req, res) {
    carService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { cars: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    carService
      .createCar(req)
      .then((car) => {
        res.status(201).json({
          status: "OK",
          data: car,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    carService
      .updateCar(req.params.id, req)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    carService
      .get(req.params.id)
      .then((car) => {
        res.status(200).json({
          status: "OK",
          data: car,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async checkCar(req, res, next) {
    try {
      const id = req.params.id;
      const carPayload = await carService.get(id);

      if (!carPayload) {
        res.status(404).json({
          status: "FAIL",
          message: `car not found!`,
        });
        return;
      }

      req.car = carPayload;

      next();
    } catch (err) {
      res.status(500).json({
        status: "FAIL",
        message: "server error!",
      });
    }
  },

  async destroy(req, res) {
    try {
      const carId = req.params.id;
      const deletedBy = req.user.id;

      await carService.deleteCar(carId, deletedBy)
      res.status(200).json({
        status: "OK",
        message: "Success"
      });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    };
  },

  // getCarById(req, res) {
  //   carService
  //     .getCarById(req.params.id)
  //     .then((car) => {
  //       res.status(200).json({
  //         status: "OK",
  //         data: car,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({
  //         status: "FAIL",
  //         message: err.message,
  //       });
  //     });
  // },

};
