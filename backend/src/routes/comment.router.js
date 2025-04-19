import { Router } from "express";
import {
  addCommentToProject,
  getCommentsForProject,
  // getCommentById,
  deleteComment,
} from "../controllers/comments.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/addcomment/:projectId").post(verifyJwt, addCommentToProject);
router.route("/deletecomment/:commentId").delete(verifyJwt, deleteComment);
router.route("/comments/:projectId").get(verifyJwt, getCommentsForProject);

export default router;
