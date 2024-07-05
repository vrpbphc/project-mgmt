import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Log = sequelize.define("Log", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    task: { type: DataTypes.UUID },
    date: { type: DataTypes.DATE },
    time: { type: DataTypes.INTEGER },
});

export default Log;