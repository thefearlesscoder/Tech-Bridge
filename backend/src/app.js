import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import applyRouter from "./routes/apply.router.js"
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true                
  }));



app.use(express.json({limit:"20kb"}));

app.use(express.urlencoded({extended: true, limit:"20kb"}))

app.use(express.static("public"));

app.use(cookieParser());

import userRouter  from "./routes/user.router.js" 
import projectRouter from "./routes/project.router.js"
import commentsRouter from "./routes/comment.router.js"
import communityRouter from "./routes/community.router.js"
import purchaseRouter from "./routes/purchase.router.js"
import applicationRouter from "./routes/application.router.js"
app.use("/api/v1/users", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/community", communityRouter);
app.use("/api/v1/apply/",applyRouter);
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/application", applicationRouter);
export { app };