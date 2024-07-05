import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar.js";
import TaskLayout from "../components/TaskLayout.js";
import ProjectForm from "../components/ProjectForm.js";
import TaskForm from "../components/TaskForm.js";

const Project = () => {
    const userId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    useEffect(() => {
        const loadProject = async () => {
            const getProjectUrl = `http://localhost:3001/project/${projectId}`;
            const getProjectResponse = await fetch(getProjectUrl, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const getProjectData = await getProjectResponse.json();
            setProject(getProjectData);
        };
        loadProject();
    }, [token, projectId]);
    const inProgressRef = useRef();
    const toDoRef = useRef();
    const completedRef = useRef();
    const editProject = async (code, name, color) => {
        const editProjectResponse = await fetch("http://localhost:3001/project", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ projectId, name, code, color })
        });
        const editProjectData = await editProjectResponse.json();
        if ("msg" in editProjectData) {
            console.log(editProjectData.msg);
        } else {
            setProject({ ...project, code: editProjectData.code, name: editProjectData.name, color: editProjectData.color })
            inProgressRef.current.reflectProjectUpdate(editProjectData.code, editProjectData.color);
            toDoRef.current.reflectProjectUpdate(editProjectData.code, editProjectData.color);
            completedRef.current.reflectProjectUpdate(editProjectData.code, editProjectData.color);
        }
    };
    const createTask = async (title, status) => {
        const createTaskResponse = await fetch("http://localhost:3001/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ projectId, title, status })
        });
        const createTaskData = await createTaskResponse.json();
        if ("msg" in createTaskData) {
            console.log(createTaskData.msg);
        } else {
            if (status === "IN_PROGRESS") {
                inProgressRef.current.addTask(createTaskData);
            } else if (status === "TO_DO") {
                toDoRef.current.addTask(createTaskData);
            } else {
                completedRef.current.addTask(createTaskData);
            }
        }
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <Link className="link bold" to="/dashboard">Return to Dashboard</Link>
                <h1>{project && `[${project.code}] ${project.name}`}</h1>
                <hr />
                <h2>Edit project</h2>
                {project && <ProjectForm project={project} saveProject={editProject} />}
                <hr />
                <h2>In Progress</h2>
                <TaskLayout ref={inProgressRef} userId={userId} token={token} projectId={projectId} status={"IN_PROGRESS"} />
                <hr />
                <h2>To Do</h2>
                <TaskLayout ref={toDoRef} userId={userId} token={token} projectId={projectId} status={"TO_DO"} />
                <hr />
                <h2>Completed</h2>
                <TaskLayout ref={completedRef} userId={userId} token={token} projectId={projectId} status={"COMPLETED"} />
                <hr />
                <h2>Create a task</h2>
                <TaskForm task={null} saveTask={createTask} />
            </div>
        </>
    );
}

export default Project;