import { useState } from "react";
import "../styles/logManager.css";

const LogManager = ({ taskId, token }) => {
    const [time, setTime] = useState(null);
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };
    const createLog = async () => {
        const instant = new Date();
        const currentISO = instant.toISOString();
        const createLogResponse = await fetch("http://localhost:3001/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ taskId, currentISO, time })
        });
        const createLogData = await createLogResponse.json();
        if ("msg" in createLogData) {
            console.log(createLogData.msg);
        }
    };
    return (
        <>
            <div className="log-form">
                <input className="textbox time" placeholder="Minutes" value={time} onChange={handleTimeChange} />
                <button onClick={createLog}>Log</button>
            </div>
        </>
    );
}

export default LogManager;