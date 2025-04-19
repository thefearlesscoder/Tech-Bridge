import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Stripe from "stripe"; 

const stripe = new Stripe(process.env.STRIPE_API_SRECRET_KEY); 

// import applyRouter from "./routes/apply.router.js";
import userRouter from "./routes/user.router.js";
import projectRouter from "./routes/project.router.js";
import commentsRouter from "./routes/comment.router.js";
import communityRouter from "./routes/community.router.js";
import purchaseRouter from "./routes/purchase.router.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Mounting Routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/community", communityRouter);
// app.use("/api/v1/apply", applyRouter);
app.use("/api/v1/purchase", purchaseRouter);

// Stripe Payment Route
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    description: "Tech Bridge",
    automatic_payment_methods: { enabled: true }
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

export { app };
