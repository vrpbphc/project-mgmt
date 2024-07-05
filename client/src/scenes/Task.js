import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar.js";
import TaskForm from "../components/TaskForm.js";
import CommentManager from "../components/CommentManager.js";
import LogManager from "../components/LogManager.js";

const Task = () => {
    const token = useSelector((state) => state.auth.token);
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    useEffect(() => {
        const loadTask = async () => {
            const getTaskUrl = `http://localhost:3001/task/${taskId}`;
            const getTaskResponse = await fetch(getTaskUrl, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const getTaskData = await getTaskResponse.json();
            setTask(getTaskData);
        };
        loadTask();
    }, [token, taskId]);
    const editTask = async (title, status) => {
        const editProjectResponse = await fetch("http://localhost:3001/task", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ taskId, title, status })
        });
        const editProjectData = await editProjectResponse.json();
        if ("msg" in editProjectData) {
            console.log(editProjectData.msg);
        } else {
            setTask({ ...task, title: editProjectData.title, status: editProjectData.status });
        }
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <Link className="link bold" to={task && `/project/${task.Project.id}`}>Go to project</Link>
                <h1>{task && `[${task.Project.code}-${task.serial}] ${task.title}`}</h1>
                <hr />
                <h2>Edit task</h2>
                {task && <TaskForm task={task} saveTask={editTask} />}
                <hr />
                <h2>Log time</h2>
                <LogManager taskId={taskId} token={token} />
                <hr />
                <h2>Comments</h2>
                <CommentManager taskId={taskId} token={token} />
            </div>
        </>
    );
}

export default Task;