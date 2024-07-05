import express from "express";
import { createLog, getTaskLogs } from "../controllers/log.js";

const logRoutes = express.Router();

logRoutes.post("/", createLog);
logRoutes.get("/task/:taskId/:currentISO", getTaskLogs);

export default logRoutes;