import { useEffect, useState } from "react";
import CommentBlock from "./CommentBlock.js";
import "../styles/commentManager.css";
import "../styles/nothing.css";

const CommentManager = ({ taskId, token }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const loadComments = async () => {
            const getCommentsResponse = await fetch(`http://localhost:3001/comment/task/${taskId}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const getCommentsData = await getCommentsResponse.json();
            setComments(getCommentsData.reverse());
        };
        loadComments();
    }, [taskId, token]);
    const [text, setText] = useState("");
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const createComment = async () => {
        const createCommentResponse = await fetch("http://localhost:3001/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ taskId, text })
        });
        const createCommentData = await createCommentResponse.json();
        if ("msg" in createCommentData) {
            console.log(createCommentData.msg);
        } else {
            setComments([createCommentData, ...comments]);
        }
    };
    return (
        <>
            <div className="comment-form">
                <input className="textbox text" placeholder="Text" value={text} onChange={handleTextChange} />
                <button onClick={createComment}>Comment</button>
            </div>
            {(comments.length === 0) ? (
                <div className="nothing">Write a comment and it will show up here</div>
            ) : (
                comments.map(comment => (
                    <CommentBlock key={comment.id} comment={comment} />
                ))
            )}
        </>
    );
}

export default CommentManager;