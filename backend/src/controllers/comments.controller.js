
import Comment from "../models/comment.models.js";
import Project from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addCommentToProject = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { projectId } = req.params;
  const userId = req.user._id;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const comment = await Comment.create({
    userId,
    projectId,
    message,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"));
});

const getCommentsForProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const comments = await Comment.find({ projectId })
    .populate("userId", "fullname avatar")
    .exec();

  if (!comments || comments.length === 0) {
    throw new ApiError(404, "No comments found for this project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const getCommentById = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId)
    .populate("userId", "fullname avatar")
    .exec();

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment fetched successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export {
  addCommentToProject,
  getCommentsForProject,
  getCommentById,
  deleteComment,
};
