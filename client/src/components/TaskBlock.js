import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/taskBlock.css";

const TaskBlock = ({ token, task }) => {
    const navigate = useNavigate();
    const [totalTime, setTotalTime] = useState(0);
    const [timeSeries, setTimeSeries] = useState([]);
    useEffect(() => {
        const loadLogs = async () => {
            const today = new Date().toISOString();
            const getLogsUrl = `http://localhost:3001/log/task/${task.id}/${today}`;
            const getLogsResponse = await fetch(getLogsUrl, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const getLogsData = await getLogsResponse.json();
            setTotalTime(getLogsData.totalTime);
            setTimeSeries(getLogsData.timeSeries);
        };
        loadLogs();
    }, [token, task]);
    const minutesToString = (minutes) => {
        const timeString = `${(Math.floor(minutes / 60)).toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}`;
        return timeString;
    };
    const goToTask = async () => {
        navigate(`/task/${task.id}`);
    };
    return (
        <div className="task" onClick={goToTask}>
            <div className="code" style={{ backgroundColor: `#${task.Project.color}` }}>{task.Project.code}-{task.serial}</div>
            <div className="text">{task.title}</div>
            <div className="total">{minutesToString(totalTime)}</div>
            {timeSeries.map(time => (
                (time === 0) ? (
                    <div className="empty-cell"></div>
                ) : (
                    <div className="cell">{minutesToString(time)}</div>
                )
            ))}
        </div>
    );
}

export default TaskBlock;