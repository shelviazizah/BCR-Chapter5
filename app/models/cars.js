'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'createdBy',
        foreignKey: 'updatedBy',
        foreignKey: 'deletedBy',
        as: 'Users'
      })
    }
  }
  Cars.init({
    nama: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ukuran: DataTypes.STRING,
    image: DataTypes.STRING,
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: "id"
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: "id"
      }
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Cars',
    paranoid: true,
  });
  return Cars;
};