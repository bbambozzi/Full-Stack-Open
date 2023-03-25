import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db";

class ActiveSession extends Model {}

ActiveSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);
export default ActiveSession;
