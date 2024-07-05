import { useState } from "react";
import "../styles/projectForm.css";

const ProjectForm = ({ project, saveProject }) => {
    const [code, setCode] = useState(project ? project.code : "");
    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };
    const [name, setName] = useState(project ? project.name : "");
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const [color, setColor] = useState(project ? project.color : "");
    const handleColorChange = (event) => {
        setColor(event.target.value);
    };
    return (
        <div className="project-form">
            <input className="textbox code" placeholder="Code" value={code} onChange={handleCodeChange} />
            <input className="textbox name" placeholder="Name" value={name} onChange={handleNameChange} />
            <input className="textbox color" placeholder="Color" value={color} onChange={handleColorChange} />
            <button onClick={() => saveProject(code, name, color)}>Save</button>
        </div>
    );
}

export default ProjectForm;