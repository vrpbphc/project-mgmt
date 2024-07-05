import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
import Dashboard from "./scenes/Dashboard";
import BackgroundWrappper from "./components/BackgroundWrapper";
import Project from "./scenes/Project";
import Task from "./scenes/Task";

const App = () => {
	return (
		<Router>
			<BackgroundWrappper>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/register" element={<SignUp />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/project/:projectId" element={<Project />} />
					<Route path="/task/:taskId" element={<Task />} />
				</Routes>
			</BackgroundWrappper>
		</Router>
	);
}

export default App;