import express from "express";
import { createComment, getTaskComments } from "../controllers/comment.js";

const commentRoutes = express.Router();

commentRoutes.post("/", createComment);
commentRoutes.get("/task/:taskId", getTaskComments);

export default commentRoutes;