import { Router } from "express";
import { addPost } from "../controllers/community.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/addpost").post(verifyJwt, addPost);

export default router;
