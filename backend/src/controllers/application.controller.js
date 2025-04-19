import CommunityPost from "../models/community.model.js";
import Application from "../models/application.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const applyToCommunityPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;
    
  
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid post ID"));
  }

  const post = await CommunityPost.findById(postId);
  if (!post) {
    return res.status(404).json(new ApiResponse(404, {}, "Post not found"));
  }

  const user = req.user;
 
  const alreadyApplied = await Application.findOne({ userId, postId });
  if (alreadyApplied) {
    return res.status(400).json(new ApiResponse(400, {}, "Already applied to this post"));
  }

  const application = await Application.create({ userId, postId });

  return res
    .status(201)
    .json(new ApiResponse(201, application, "Applied successfully to the post"));
});

export { applyToCommunityPost };
