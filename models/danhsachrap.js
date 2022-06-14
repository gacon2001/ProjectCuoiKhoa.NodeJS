'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhSachRap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DanhSachRap.init({
    maRap: DataTypes.INTEGER,
    tenRap: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DanhSachRap',
  });
  return DanhSachRap;
};