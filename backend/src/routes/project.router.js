import { Router } from "express";
import {
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
} from "../controllers/project.controller.js";
import dotenv from 'dotenv'; 
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

import Stripe from "stripe";
const stripe = Stripe(
  "sk_test_51QJ5RTAI8xVNoO7T66S6lNNc7Ts96kL6ehGHkn31IUHGVu9jlwk7DsdrRBwMzL77oEtRtpy0YAYGxEn2J5Rgg1Rz00vp8Sm9nI"
);// Make sure to call dotenv.config() at the top

const router = Router();


router.route("/addproject").post(verifyJwt, createProject);
router.route("/deleteproject/:projectId").delete(verifyJwt, deleteProject);
router.route("/editproject/:projectId").put(verifyJwt, editProject);
router.route("/myprojects").get(verifyJwt, getMylist);
router.route("/projects").get(verifyJwt, getProjectList);
// router.route("/projects").get(getProjectList);
router.route("/details/:id").get(verifyJwt, getProjectDetails);
router.route("/addbookmark/:projectId").post(verifyJwt, addBookmark);
router.route("/removebookmark/:projectId").delete(verifyJwt, removeBookmark);
router.route("/bookmarkedprojects").get(verifyJwt, getBookmarkedProjects);
router.route("/collabprojects").get(getAllcollabProjects);
router.route("/completedprojects").get(getCompletedProjects);
router.post("/create-checkout-session", async (req, res) => {
  const product = req.body;
  console.log(product.project);

  const line_items = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.project.price,
        },
        unit_amount: product.project.price* 100,
      },
      quantity: 1,
    },
  ];

  console.log(line_items);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `http://localhost:5173/project-detail/${product.project._id}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/project-detail/${product.project._id}`,
    });

    // console.log(session)

    return res.status(200).json({
      success: true,
      id: session.id,
      message: "Payment Succesfull",
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;



