import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    project: { type: DataTypes.UUID },
    title: { type: DataTypes.STRING },
    serial: { type: DataTypes.INTEGER },
    status: {
        type: DataTypes.ENUM,
        values: ["TO_DO", "IN_PROGRESS", "COMPLETED"],
    }
});

export default Task;