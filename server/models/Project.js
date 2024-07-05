import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Project = sequelize.define("Project", {
    id: {type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    user: { type: DataTypes.UUID },
    name: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    count: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export default Project;