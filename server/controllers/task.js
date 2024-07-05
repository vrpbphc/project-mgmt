import { Task, Project} from "../models/index.js";

export const createTask = async (req, res) => {
    try {
        const { projectId, title, status } = req.body;
        const project = await Project.findByPk(projectId);
        project.count++;
        await project.save();
        const task = await Task.create({ project: projectId, title, status, serial: project.count });
        const completeTask = await Task.findByPk(task.id, {
            include: {
                model: Project,
                attributes: ["code", "color"],
            }
        });
        res.status(201).json(completeTask);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

export const getInProgressTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.findAll({
            where: { status: "IN_PROGRESS" },
            include: {
                model: Project,
                attributes: ["code", "color"],
                where: { user: userId }
            },
            order: [
                [{ model: Project }, "code", "ASC"],
                ["serial", "ASC"]
            ]
        });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const getProjectTasks = async (req, res) => {
    try {
        const { projectId, status } = req.params;
        const tasks = await Task.findAll({
            where: { project: projectId, status },
            include: {
                model: Project,
                attributes: ["code", "color"],
            },
            order: [
                ["serial", "ASC"]
            ]
        });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByPk(taskId, {
            include: {
                model: Project,
                attributes: ["id", "code", "color"],
            }
        });
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { taskId, title, status } = req.body;
        const task = await Task.findByPk(taskId);
        task.title = title;
        task.status = status;
        await task.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};