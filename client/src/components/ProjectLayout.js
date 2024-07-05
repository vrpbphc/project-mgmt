import ProjectBlock from "../components/ProjectBlock.js";
import "../styles/projectLayout.css";
import "../styles/nothing.css";

const ProjectLayout = ({ projects }) => {
    return (
        <>
            {(projects.length === 0) ? (
                <div className="nothing">Create a project and it will show up here</div>
            ) : (
                <div className="project-layout">
                    {projects.map(project => (
                        <ProjectBlock key={project.id} project={project} />
                    ))}
                </div>
            )}
        </>
    );
}

export default ProjectLayout;