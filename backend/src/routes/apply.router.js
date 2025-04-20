import express from "express";
import Project from "../models/project.model.js";
import sendEmail from "../utils/sendEmail.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";
import applyProject from "../controllers/apply.controller.js";
const router = express.Router();
// Apply to a project
router.post("/:projectId", verifyJwt,applyProject );


export default router;
