import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updatedAccountDetails,
  updateUserAvatar,
  getUserDetails
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(
  // upload.fields([
  //   {
  //     name: "avatar",
  //     maxCount: 1,
  //   },
  // ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/getCurrentUser").get(verifyJwt, getCurrentUser);
router.route("/update-details").post(verifyJwt, updatedAccountDetails);
router.route("/update-avatar").post(
  verifyJwt,
  upload.fields([{ name: "avatar", maxCount: 1 }]), 
  updateUserAvatar
);
router.route("/user/:id").get(verifyJwt, getUserDetails);


export default router;
