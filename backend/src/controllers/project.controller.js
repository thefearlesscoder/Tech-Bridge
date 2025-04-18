import Project from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProject = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const {
    title,
    description,
    techStack,
    category,
    pitchDeckUrl,
    demoUrl,
    mediaUrls,
    lookingForCollaborators,
    requiredSkills,
  } = req.body;

  if (!userId || !title || !description || !techStack?.length) {
    throw new ApiError(
      400,
      "Missing required fields: userId, title, description, techStack"
    );
  }
  const project = new Project({
    userId,
    title,
    description,
    techStack,
    category,
    pitchDeckUrl,
    demoUrl,
    mediaUrls,
    lookingForCollaborators,
    requiredSkills,
  });

  const saved = await project.save();
  res
    .status(201)
    .json(new ApiResponse(201, saved, "Project created successfully"));
});
const deleteProject = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this project");
  }

  await Project.deleteOne({ _id: projectId });

  res
    .status(200)
    .json(new ApiResponse(200, null, "Project deleted successfully"));
});
const editProject = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { projectId } = req.params;
  const {
    title,
    description,
    techStack,
    category,
    pitchDeckUrl,
    demoUrl,
    mediaUrls,
    lookingForCollaborators,
    requiredSkills,
  } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to edit this project");
  }

  project.title = title || project.title;
  project.description = description || project.description;
  project.techStack = techStack || project.techStack;
  project.category = category || project.category;
  project.pitchDeckUrl = pitchDeckUrl || project.pitchDeckUrl;
  project.demoUrl = demoUrl || project.demoUrl;
  project.mediaUrls = mediaUrls || project.mediaUrls;
  project.lookingForCollaborators =
    lookingForCollaborators !== undefined
      ? lookingForCollaborators
      : project.lookingForCollaborators;
  project.requiredSkills = requiredSkills || project.requiredSkills;

  const updatedProject = await project.save();

  res
    .status(200)
    .json(new ApiResponse(200, updatedProject, "Project updated successfully"));
});

export { createProject, deleteProject, editProject };
