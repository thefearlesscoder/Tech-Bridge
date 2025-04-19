import { Router } from "express";
import {
    createProject,
    deleteProject,
    editProject
} from "../controllers/project.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  
);

router.route("/addproject").post(createProject);
router.route("/deleteproject/:projectId").delete(verifyJwt,deleteProject);
router.route("/editproject/:projectId").put(verifyJwt,editProject);



export default router;
