import express from "express";
import { createProject, getUserProjects, getProject, updateProject } from "../controllers/project.js";
import { verifyToken } from "../middleware/auth.js";

const projectRoutes = express.Router();

projectRoutes.post("/", verifyToken, createProject);
projectRoutes.get("/user/:userId", verifyToken, getUserProjects);
projectRoutes.get("/:projectId", verifyToken, getProject);
projectRoutes.patch("/", verifyToken, updateProject);

export default projectRoutes;