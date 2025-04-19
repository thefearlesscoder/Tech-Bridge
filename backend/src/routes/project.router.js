import { Router } from "express";
import {
  createProject,
  deleteProject,
  editProject,
  getMylist,
  getProjectList,
  getProjectDetails,
  addBookmark,
  removeBookmark,
} from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ])
);

router.route("/addproject").post(verifyJwt, createProject);
router.route("/deleteproject/:projectId").delete(verifyJwt, deleteProject);
router.route("/editproject/:projectId").put(verifyJwt, editProject);
router.route("/myprojects").get(verifyJwt, getMylist);
router.route("/projects").post(verifyJwt, getProjectList);
router.route("/details/:id").get(verifyJwt, getProjectDetails);
router.route("/addbookmark/:projectId").post(verifyJwt, addBookmark);
router.route("/removebookmark/:projectId").delete(verifyJwt, removeBookmark);
export default router;
