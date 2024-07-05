import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from "../state/auth.js";
import "../styles/card.css";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const [password, setPassword] = useState("");
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const signIn = async () => {
        const signInResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const signInData = await signInResponse.json();
        if ("msg" in signInData) {
            console.log(signInData.msg);
        } else {
            dispatch(setUserToken({
                userId: signInData.user.id,
                token: signInData.token
            }));
            navigate("/dashboard");
        }
    };
    return (
        <div className="card">
            <p className="logo">mgmt</p>
            <p className="tagline">work made easy</p>
            <input className="textbox" placeholder="Username" value={username} onChange={handleUsernameChange} />
            <input className="textbox" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
            <button onClick={signIn}>Sign in</button>
            <Link className="link" to="/register">Create an account</Link>
        </div>
    );
}

export default SignIn;