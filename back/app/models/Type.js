import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class Type extends Model {}

Type.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "type",
  }
);
