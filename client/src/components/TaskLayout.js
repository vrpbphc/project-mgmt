import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import TaskBlock from "../components/TaskBlock.js";
import "../styles/nothing.css";

const TaskLayout = forwardRef(({ userId, token, projectId, status }, ref) => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const loadTasks = async () => {
            const getTasksUrl = "http://localhost:3001/task/" + ((projectId == null) ? `user/${userId}` : `project/${projectId}/${status}`);
            const getTasksResponse = await fetch(getTasksUrl, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const getTasksData = await getTasksResponse.json();
            setTasks(getTasksData);
        };
        loadTasks();
    }, [userId, token, projectId, status]);
    useImperativeHandle(ref, () => ({
        reflectProjectUpdate(code, color) {
            setTasks(tasks.map(task => {
                return { ...task, Project: { code, color } }
            }));
        },
        addTask(task) {
            setTasks([...tasks, task]);
        }
    }));
    return (
        <>
            {(tasks.length === 0) ? (
                <div className="nothing">No tasks available here</div>
            ) : (
                tasks.map(task => (
                    <TaskBlock key={task.id} token={token} task={task} />
                ))
            )}
        </>
    );
});

export default TaskLayout;