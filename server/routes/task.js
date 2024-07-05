import express from "express";
import { createTask, getInProgressTasks, getProjectTasks, getTask, updateTask } from "../controllers/task.js";
import { verifyToken } from "../middleware/auth.js";

const taskRoutes = express.Router();

taskRoutes.post("/", verifyToken, createTask);
taskRoutes.get("/user/:userId", verifyToken, getInProgressTasks);
taskRoutes.get("/project/:projectId/:status", verifyToken, getProjectTasks);
taskRoutes.get("/:taskId", verifyToken, getTask);
taskRoutes.patch("/", verifyToken, updateTask);

export default taskRoutes;