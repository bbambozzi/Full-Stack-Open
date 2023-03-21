import { Sequelize, Model, DataTypes } from "sequelize";
import { DATABASE_URL } from "./config";
const sequelize = new Sequelize(DATABASE_URL);

export default sequelize;
