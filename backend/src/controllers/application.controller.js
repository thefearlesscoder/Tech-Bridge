import CommunityPost from "../models/community.model.js";
import Application from "../models/application.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import sendEmail from "../utils/sendEmail.js";

const applyToCommunityPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;
  const { message } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid post ID"));
  }

  const post = await CommunityPost.findById(postId);
  if (!post) {
    return res.status(404).json(new ApiResponse(404, {}, "Post not found"));
  }

  const user = req.user;
  const userEmail = user.email;

  const sender = await User.findById(post.userId);
  const senderEmail = sender.email;

  const alreadyApplied = await Application.findOne({ userId, postId });
  if (alreadyApplied) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Already applied to this post"));
  }

  const application = await Application.create({ userId, postId, message });
  if (!application) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Failed to apply to the post"));
  }

  const subject = `Application for Community Post: ${post.title}`;

  const emailStyles = `
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    margin: auto;
    border: 1px solid #ddd;
  `;

  const headingStyle = `
    color: #0066cc;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  `;

  const messageContentForUser = `
    <div style="${emailStyles}">
      <h2 style="${headingStyle}">Application Confirmation</h2>
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>You've successfully applied to the community post titled: <strong>${post.title}</strong>.</p>
      <p>We’ll get back to you soon. Stay tuned!</p>
      <br>
      <p style="font-size: 14px; color: #666;">— The TechBridge Team</p>
    </div>
  `;

  const messageContentForSender = `
    <div style="${emailStyles}">
      <h2 style="${headingStyle}">New Application Received</h2>
      <p>Hi <strong>${sender.name}</strong>,</p>
      <p><strong>${user.name}</strong> has applied to your post titled: <strong>${post.title}</strong>.</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Post Link:</strong> <a href="${post.link}" style="color: #0066cc;">${post.link}</a></p>
      <br>
      <p style="font-size: 14px; color: #666;">— The TechBridge Team</p>
    </div>
  `;

  try {
    await sendEmail(userEmail, messageContentForUser, subject);
    await sendEmail(senderEmail, messageContentForSender, subject);
  } catch (err) {
    console.error("Email send error:", err);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Application saved, but failed to send emails"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, application, "Applied successfully to the post"));
});

export { applyToCommunityPost };
