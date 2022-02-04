"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      item.belongsTo(models.list, {
        as: "listItem",
        foreignKey: "idList",
      })
    }
  }
  item.init(
    {
      value: DataTypes.STRING,
      done: DataTypes.BOOLEAN,
      idList: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "items",
      modelName: "item",
    }
  )
  return item
}
