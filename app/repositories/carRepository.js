const { Cars } = require("../models");

module.exports = {
  create(createArgs) {
    return Cars.create(createArgs);
  },

  update(id, updateArgs) {
    return Cars.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(carId) {
    return Cars.destroy({
      where: {
        id: carId
      }
    });
  },

  find(id) {
    return Cars.findByPk(id), {
      include: [
        {
          model: User,
          as: "created",
        },
        {
          model: User,
          as: "updated",
        },
        {
          model: User,
          as: "deleted",
        },
      ],
      attributes: { exclude: ["createdBy", "updatedBy", "deletedBy"] },
    };
  },

  findAll() {
    return Cars.findAll();
  },

  getTotalCars() {
    return Cars.count();
  },

  updateCar(carId, updateArgs) {
    return Cars.update(updateArgs, { where: { id: carId } });
  },
  deleteCar(carId, updateArgs) {
    return Cars.delete(updateArgs, { where: { id: carId } });
  },
};
