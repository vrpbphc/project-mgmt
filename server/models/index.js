import sequelize from "../config/database.js";
import User from "./User.js";
import Project from "./Project.js";
import Task from "./Task.js";
import Log from "./Log.js";
import Comment from "./Comment.js";

User.hasMany(Project, { foreignKey: "user" });
Project.belongsTo(User, { foreignKey: "user" });

Project.hasMany(Task, { foreignKey: "project" });
Task.belongsTo(Project, { foreignKey: "project" });

Task.hasMany(Log, { foreignKey: "task" });
Log.belongsTo(Task, { foreignKey: "task" });

Comment.hasMany(Log, { foreignKey: "task" });
Log.belongsTo(Comment, { foreignKey: "task" });

export { sequelize, User, Project, Task, Log, Comment };