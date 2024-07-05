import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";
import logRoutes from "./routes/log.js";
import commentRoutes from "./routes/comment.js";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);
app.use("/log", logRoutes);
app.use("/comment", commentRoutes);

try {
    await sequelize.authenticate();
    console.log("Connection to database has been established");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} catch (err) {
    console.log(`Unable to connect to database ${err}`);
}