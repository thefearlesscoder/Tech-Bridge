import { Router } from "express";
import {
  createPurchase,
  getPurchases,
} from "../controllers/purchase.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/:productId").post(verifyJwt, createPurchase);
router.route("/mypurchases").get(verifyJwt, getPurchases);
export default router;
