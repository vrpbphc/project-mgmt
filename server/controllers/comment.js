import { Comment } from "../models/index.js";

export const createComment = async (req, res) => {
    try {
        const { taskId, text } = req.body;
        const comment = await Comment.create({ task: taskId, text });
        res.status(201).json(comment);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

export const getTaskComments = async (req, res) => {
    try {
        const { taskId } = req.params;
        const comments = await Comment.findAll({
            where: { task: taskId }
        });
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};