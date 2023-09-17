'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_of_borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.borrow)
      this.belongsTo(models.book)
    }
  }
  detail_of_borrow.init({
    borrowID: DataTypes.INTEGER,
    bookID: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_of_borrow',
  });
  return detail_of_borrow;
};