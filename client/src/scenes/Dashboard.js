import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar.js";
import TaskLayout from "../components/TaskLayout.js";
import ProjectLayout from "../components/ProjectLayout.js";
import ProjectForm from "../components/ProjectForm.js";

const Dashboard = () => {
    const userId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const loadProjects = async () => {
            const getProjectsResponse = await fetch(`http://localhost:3001/project/user/${userId}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const getProjectsData = await getProjectsResponse.json();
            setProjects(getProjectsData);
        };
        loadProjects();
    }, [userId, token]);
    const createProject = async (code, name, color) => {
        const createProjectResponse = await fetch("http://localhost:3001/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ userId, name, code, color })
        });
        const createProjectData = await createProjectResponse.json();
        if ("msg" in createProjectData) {
            console.log(createProjectData.msg);
        } else {
            setProjects([...projects, { ...createProjectData, inProgressCount: 0, completedCount: 0, toDoCount: 0 }]);
        }
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Dashboard</h1>
                <hr />
                <h2>Tasks</h2>
                <TaskLayout userId={userId} token={token} projectId={null} status={null} />
                <hr />
                <h2>Projects</h2>
                <ProjectLayout projects={projects} />
                <hr />
                <h2>Create a project</h2>
                <ProjectForm project={null} saveProject={createProject} />
            </div>
        </>
    );
}

export default Dashboard;