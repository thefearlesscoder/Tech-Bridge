import { CommunityPost } from "../models/community.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addPost = asyncHandler(async (req, res) => {
  const { role, title, lookingFor, description, projectId } = req.body;

  if (!role || !title || !lookingFor || !description) {
    throw new ApiError(400, "All fields are required");
  }

  const post = await CommunityPost.create({
    userId: req.user._id,
    role,
    title,
    lookingFor,
    description,
    projectId,
  });
});
