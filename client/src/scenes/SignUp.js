import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from "../state/auth.js";
import "../styles/card.css";

const SignUp = () => {
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
    const signUp = async () => {
        const signUpResponse = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const signUpData = await signUpResponse.json();
        if ("msg" in signUpData) {
            console.log(signUpData.msg);
        } else {
            dispatch(setUserToken({
                userId: signUpData.user.id,
                token: signUpData.token
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
            <button onClick={signUp}>Sign up</button>
            <Link className="link" to="/">Log in to existing account</Link>
        </div>
    );
}

export default SignUp;