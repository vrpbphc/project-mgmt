import { Sequelize } from "sequelize";
import { Project, Task } from "../models/index.js";

export const createProject = async (req, res) => {
    try {
        const { userId, name, code, color } = req.body;
        const alreadyExists = await Project.findOne({ where: { code } });
        if (alreadyExists) return res.status(400).json({ msg: "This code has already been taken" });
        const project = await Project.create({ user: userId, name, code, color });
        res.status(201).json(project);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

export const getUserProjects = async (req, res) => {
    try {
        const { userId } = req.params;
        const projects = await Project.findAll({
            where: { user: userId },
            attributes: {
                include: [
                    [Sequelize.cast(Sequelize.fn("COUNT", Sequelize.literal("CASE WHEN \"Tasks\".status = 'IN_PROGRESS' THEN 1 ELSE NULL END")), "integer"), "inProgressCount"],
                    [Sequelize.cast(Sequelize.fn("COUNT", Sequelize.literal("CASE WHEN \"Tasks\".status = 'COMPLETED' THEN 1 ELSE NULL END")), "integer"), "completedCount"],
                    [Sequelize.cast(Sequelize.fn("COUNT", Sequelize.literal("CASE WHEN \"Tasks\".status = 'TO_DO' THEN 1 ELSE NULL END")), "integer"), "toDoCount"]
                ]
            },
            include: {
                model: Task,
                attributes: []
            },
            group: ["Project.id"],
            order: [
                ["code", "ASC"]
            ]
        });
        res.status(200).json(projects);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const getProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findByPk(projectId);
        res.status(200).json(project);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { projectId, name, code, color } = req.body;
        const project = await Project.findByPk(projectId);
        project.name = name;
        project.code = code;
        project.color = color;
        await project.save();
        res.status(200).json(project);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};