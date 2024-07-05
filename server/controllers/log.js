import { Log } from "../models/index.js";

export const createLog = async (req, res) => {
    try {
        const { taskId, time, currentISO } = req.body;
        const date = new Date(currentISO);
        const log = await Log.create({ task: taskId, date, time });
        res.status(201).json(log);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

export const getTaskLogs = async (req, res) => {
    try {
        const { taskId, currentISO } = req.params;
        const date = new Date(currentISO);
        let timeSeries = [];
        let totalTime = 0;
        for (let daysBack = 0; daysBack < 5; daysBack++) {
            let time = await Log.sum("time", {
                where: { task: taskId, date }
            });
            date.setDate(date.getDate() - 1);
            if (time === null) time = 0;
            timeSeries.push(time);
            totalTime += time;
        }
        res.status(200).json({ totalTime, timeSeries });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};