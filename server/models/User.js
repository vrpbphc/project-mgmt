import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
});

export default User;