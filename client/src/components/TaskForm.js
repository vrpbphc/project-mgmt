import { useState } from "react";
import "../styles/taskForm.css";

const TaskForm = ({ task, saveTask }) => {
    const [title, setTitle] = useState(task ? task.title : "");
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const [status, setStatus] = useState(task ? task.status : "TO_DO");
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <div className="task-form">
            <input className="textbox title" placeholder="Title" value={title} onChange={handleTitleChange} />
            <select value={status} onChange={handleStatusChange}>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="TO_DO">To Do</option>
                <option value="COMPLETED">Completed</option>
            </select>
            <button onClick={() => saveTask(title, status)}>Save</button>
        </div>
    );
}

export default TaskForm;