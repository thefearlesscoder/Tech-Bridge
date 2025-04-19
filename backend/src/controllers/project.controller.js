import Project from "../models/project.model.js";
import { User } from "../models/user.model.js";
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
    mediaUrls,
    lookingForCollaborators,
    requiredSkills,
    gitHub,
    price
  } = req.body;

  if (!userId || !title || !description) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "Missing required fields: userId, title, description"
        )
      );
  }

  const project = new Project({
    userId,
    title,
    description,
    techStack,
    category,
    pitchDeckUrl,
    gitHub,
    mediaUrls,
    lookingForCollaborators,
    requiredSkills,
    price
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
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Project not found"));
  }

  if (project.userId.toString() !== userId.toString()) {
    return res
      .status(403)
      .json(
        new ApiResponse(
          403,
          null,
          "You are not authorized to delete this project"
        )
      );
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
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Project not found"));
  }

  if (project.userId.toString() !== userId.toString()) {
    return res
      .status(403)
      .json(
        new ApiResponse(
          403,
          null,
          "You are not authorized to edit this project"
        )
      );
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

const getMylist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const projects = await Project.find({ userId });

  if (!projects || projects.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, [], "No projects found for this user"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

const getProjectList = asyncHandler(async (req, res) => {
  const { topic } = req.query;

  let filter = {};
  if (topic) {
    filter = {
      category: { $regex: topic, $options: "i" },
    };
  }

  const projects = await Project.find(filter)
    .populate("userId", "fullname email avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Project list fetched successfully"));
});

const getProjectDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const project = await Project.findById(id)
    .populate("viewLogs.userId", "fullname email avatar") 
    .populate("userId", "fullname email avatar"); 

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (userId) {
    const alreadyViewed = project.viewLogs.some(
      (log) => log.userId._id.toString() === userId.toString()
    );

    if (!alreadyViewed) {
      project.viewLogs.push({ userId });
    }
  }

  await project.save();

  return res.status(200).json(
    new ApiResponse(200, project, "Project details fetched successfully")
  );
});


const addBookmark = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { projectId } = req.params;

  const user = await User.findById(userId);
  if (!user)
    return res.status(404).json(new ApiResponse(404, null, "User not found"));

  const project = await Project.findById(projectId);
  if (!project)
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Project not found"));

  const alreadyBookmarked = user.bookmarks.includes(projectId);
  if (alreadyBookmarked) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Project already bookmarked"));
  }

  user.bookmarks.push(projectId);
  await user.save();

  const alreadyInterested = project.interests.some(
    (interest) => interest.userId.toString() === userId.toString()
  );
  if (!alreadyInterested) {
    project.interests.push({ userId });
    await project.save();
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { bookmarks: user.bookmarks, interests: project.interests },
        "Bookmark and interest added successfully"
      )
    );
});

const removeBookmark = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { projectId } = req.params;

  const user = await User.findById(userId);
  if (!user)
    return res.status(404).json(new ApiResponse(404, null, "User not found"));

  const project = await Project.findById(projectId);
  if (!project)
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Project not found"));

  const wasBookmarked = user.bookmarks.includes(projectId);
  if (!wasBookmarked) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Project not bookmarked"));
  }

  user.bookmarks = user.bookmarks.filter(
    (bookmarkId) => bookmarkId.toString() !== projectId
  );
  await user.save();

  project.interests = project.interests.filter(
    (interest) => interest.userId.toString() !== userId.toString()
  );
  await project.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { bookmarks: user.bookmarks, interests: project.interests },
        "Bookmark and interest removed successfully"
      )
    );
});

const getAllcollabProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ lookingForCollaborators: true })
    .populate("userId", "fullname email avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Project list fetched successfully"));
});

const getCompletedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ lookingForCollaborators: false })
    .populate("userId", "fullname email avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Project list fetched successfully"));
});

const getBookmarkedProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId)
  console.log("User bookmarks: ", user.bookmarks);
  console.log(user);
  
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "User not found"));
  }

  const bookmarks = user.bookmarks;

  return res
    .status(200)
    .json(new ApiResponse(200, bookmarks, "Bookmarked projects fetched successfully"));
})

export {
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
};
