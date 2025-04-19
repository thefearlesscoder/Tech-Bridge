import { Router } from "express";
import {
  addPost,
  getPostOfRole,
  updatePost,
  deletePost,
  getMyPosts
} from "../controllers/community.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/addpost").post(verifyJwt, addPost);
router.route("/getpostofrole").post(verifyJwt, getPostOfRole);
router.route("/updatepost/:postId").put(verifyJwt, updatePost);
router.route("/deletepost/:postId").delete(verifyJwt, deletePost);
router.route("/getmyposts").get(verifyJwt, getMyPosts);
export default router;
