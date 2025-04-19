import { Purchase } from "../models/purchase.model.js";
import Project from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

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
