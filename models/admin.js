'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.borrow, {
        foreignKey: `adminID`, as: "borrow"
      })
    }
  }
  admin.init({
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};