import "../styles/commentBlock.css";

const CommentBlock = ({ comment }) => {
    console.log(comment);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const getDisplayInfo = (string) => {
        const instant = new Date(string);
        const date = `${months[instant.getMonth()]} ${instant.getDate()}, ${instant.getFullYear()}`;
        const time = `${instant.getHours().toString().padStart(2, "0")}:${instant.getMinutes().toString().padStart(2, "0")}`;
        return `${date} | ${time}`;
    }
    return (
        <div className="comment">
            <p className="info">{getDisplayInfo(comment.stamp)}</p>
            <p className="text">{comment.text}</p>
        </div>
    );
}

export default CommentBlock;