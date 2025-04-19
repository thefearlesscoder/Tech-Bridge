import CommunityPost from "../models/community.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

  if (role !== "Developer") {
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
const getPostofCollabPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { sortBy } = req.body;
  const sortOption = sortBy || "createdAt";  

  const posts = await CommunityPost.find({ role: "Collab" })  
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


export { addPost, getPostofCollabPost };
