import CommunityPost from "../models/community.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const addPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("ffd");

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  const { role, title, lookingFor, description, projectId, budget } = req.body;

  if (!role || !title || !lookingFor || !description) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All required fields must be provided"));
  }

  let postData = {
    userId,
    role,
    title,
    lookingFor,
    description,
  };

  if (role === "Developer" || role === "Collab") {
    if (!projectId) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Project ID is required for Developer role")
        );
    }
    postData.projectId = projectId;
  }

  if (role === "VC") {
    if (budget === undefined || budget < 0) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Valid budget is required for VC role"));
    }
    postData.budget = budget;
  }

  const post = await CommunityPost.create(postData);

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post added successfully"));
});
const getPostOfRole = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { sortBy, role } = req.body;
  const sortOption = sortBy || "createdAt";

  const validRoles = ["Collab", "Developer", "VC"];
  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid role provided"));
  }

  const posts = await CommunityPost.find({ role })
    .populate("userId", "fullname avatar")
    .sort({ [sortOption]: -1 })
    .exec();

  if (!posts || posts.length === 0) {
    return res.status(404).json(new ApiResponse(404, {}, "No posts found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  const post = await CommunityPost.findById(postId);

  if (!post) {
    return res.status(404).json(new ApiResponse(404, {}, "Post not found"));
  }

  if (post.userId.toString() !== userId.toString()) {
    return res
      .status(403)
      .json(
        new ApiResponse(403, {}, "You are not authorized to delete this post")
      );
  }

  await CommunityPost.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

const updatePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;
  const { role, title, lookingFor, description, projectId, budget } = req.body;

  let validProjectId = null;
  if (role === "Developer" && projectId) {
    
    if (mongoose.Types.ObjectId.isValid(projectId)) {
      validProjectId = new mongoose.Types.ObjectId(projectId); 
    } else {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid projectId format"));
    }
  }
  const post = await CommunityPost.findById(postId);

  if (!post) {
    return res.status(404).json(new ApiResponse(404, {}, "Post not found"));
  }

  if (post.userId.toString() !== userId.toString()) {
    return res.status(403).json(new ApiResponse(403, {}, "You are not authorized to update this post"));
  }
  const updatedPostData = { role, title, lookingFor, description };

  if (role === "Developer" && validProjectId) {
    updatedPostData.projectId = validProjectId;
  }

  if (role === "VC" && budget !== undefined && budget >= 0) {
    updatedPostData.budget = budget;
  }

  const updatedPost = await CommunityPost.findByIdAndUpdate(postId, updatedPostData, { new: true });

  return res.status(200).json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

export { addPost, getPostOfRole, updatePost, deletePost };
