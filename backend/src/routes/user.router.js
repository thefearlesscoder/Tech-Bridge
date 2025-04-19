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
  getUserDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";
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
router
  .route("/update-avatar")
  .post(
    verifyJwt,
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    updateUserAvatar
  );
router.route("/user/:id").get(verifyJwt, getUserDetails);

router.route("/bookmark/:projectId").post(verifyJwt, async (req, res) => {
  try {
    const userId = req.user._id;
    const projectId = req.params.projectId;

    const user = await User.findById(userId);

    // Check if already bookmarked
    const isBookmarked = user.bookmarks.includes(projectId);

    if (isBookmarked) {
      // Remove bookmark
      await User.findByIdAndUpdate(userId, {
        $pull: { bookmarks: projectId },
      });
      return res.status(200).json({
        success: true,
        message: "Project removed from bookmarks",
        isBookmarked: false,
      });
    } else {
      // Add bookmark
      await User.findByIdAndUpdate(userId, {
        $addToSet: { bookmarks: projectId },
      });
      return res.status(200).json({
        success: true,
        message: "Project added to bookmarks",
        isBookmarked: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.route("/bookmarks").get(verifyJwt, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("bookmarks");

    return res.status(200).json({
      success: true,
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
