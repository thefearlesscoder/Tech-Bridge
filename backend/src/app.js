import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));



app.use(express.json({limit:"20kb"}));

app.use(express.urlencoded({extended: true, limit:"20kb"}))

app.use(express.static("public"));

app.use(cookieParser());

import userRouter  from "./routes/user.router.js" 
import projectRouter from "./routes/project.router.js"
// routes declarations

app.use("/api/v1/users", userRouter);
app.use("/api/v1/project", projectRouter);




export { app };