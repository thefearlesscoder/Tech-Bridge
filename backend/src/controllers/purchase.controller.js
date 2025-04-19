import { Purchase } from "../models/purchase.model.js";
import Project from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";

const createPurchase = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { amountPaid, paymentMethod, transactionId } = req.body;

  if (!productId || !amountPaid || !paymentMethod || !transactionId) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "Missing required fields: productId, amountPaid, paymentMethod, transactionId"
        )
      );
  }

  const alreadyPurchased = await Purchase.findOne({ productId });
  if (alreadyPurchased) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Already purchased"));
  }

  const project = await Project.findById(productId);
  if (!project) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Project not found"));
  }

  if (project.purchased) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Project already purchased"));
  }

  const purchase = new Purchase({
    userId,
    productId,
    amountPaid,
    paymentMethod,
    transactionId,
  });

  await purchase.save();
  project.purchased = true;
  await project.save();

  const user = await User.findById(userId);
  const userEmail = user.email;
  const projectTitle = project.title;

  const subject = `Purchase Confirmation - ${projectTitle}`;

  const emailStyles = `
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    margin: auto;
    border: 1px solid #ddd;
  `;

  const headingStyle = `
    color: #28a745;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  `;

  const messageContent = `
    <div style="${emailStyles}">
      <h2 style="${headingStyle}">Purchase Confirmation</h2>
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>Thank you for purchasing the project: <strong>${projectTitle}</strong>.</p>
      <p><strong>Amount Paid:</strong> $${amountPaid}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p>We hope this project helps you in your journey!</p>
      <br>
      <p style="font-size: 14px; color: #666;">— The TechBridge Team</p>
    </div>
  `;

  try {
    await sendEmail(userEmail, messageContent, subject);
  } catch (err) {
    console.error("Email send error:", err);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Purchase saved, but failed to send confirmation email"
        )
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        purchase,
        "Purchase successful and project marked as purchased"
      )
    );
});

const getPurchases = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const purchases = await Purchase.find({ userId }).populate(
    "productId",
    "title description price"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, purchases, "Purchases retrieved successfully"));
});

export { createPurchase, getPurchases };
