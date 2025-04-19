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
  getAllcollabProjects,
  getCompletedProjects,
  getBookmarkedProjects
} from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/addproject").post(verifyJwt, createProject);
router.route("/deleteproject/:projectId").delete(verifyJwt, deleteProject);
router.route("/editproject/:projectId").put(verifyJwt, editProject);
router.route("/myprojects").get(verifyJwt, getMylist);
router.route("/projects").get(verifyJwt, getProjectList);
// router.route("/projects").get(getProjectList);
router.route("/details/:id").get(verifyJwt, getProjectDetails);
router.route("/addbookmark/:projectId").post(verifyJwt, addBookmark);
router.route("/removebookmark/:projectId").delete(verifyJwt, removeBookmark);
router.route("/bookmarkedprojects").get(verifyJwt, getBookmarkedProjects);
router.route("/collabprojects").get(getAllcollabProjects);
router.route("/completedprojects").get(getCompletedProjects);

export default router;
