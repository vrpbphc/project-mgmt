import { useNavigate } from "react-router-dom";
import "../styles/projectBlock.css";

const ProjectBlock = ({ project }) => {
    const navigate = useNavigate();
    const goToProject = async () => {
        navigate(`/project/${project.id}`);
    };
    return (
        <div className="project" onClick={goToProject}>
            <div className="head" style={{ backgroundColor: `#${project.color}` }}>
                <span className="line code">{project.code}</span>
                <span className="line">{project.name}</span>
            </div>
            <div className="content">
                <span className="line">In Progress: <span className="bold">{project.inProgressCount}</span></span>
                <span className="line">To Do: <span className="bold">{project.toDoCount}</span></span>
                <span className="line">Completed: <span className="bold">{project.completedCount}</span></span>
            </div>
        </div>
    );
}

export default ProjectBlock;