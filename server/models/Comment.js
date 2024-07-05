import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    task: { type: DataTypes.UUID },
    stamp: {
        type: DataTypes.TIME,
        defaultValue: Sequelize.NOW
    },
    text: { type: DataTypes.TEXT },
});

export default Comment;