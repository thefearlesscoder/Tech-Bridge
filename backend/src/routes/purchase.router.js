import {Router} from "express";
import {createPurchase} from "../controllers/purchase.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/:productId").post( verifyJwt,  createPurchase);

export default router;