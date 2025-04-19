import { Router } from "express";
import {
    applyToCommunityPost
} from "../controllers/application.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/applyToCommunityPost/:postId").post(verifyJwt, applyToCommunityPost);

export default router;