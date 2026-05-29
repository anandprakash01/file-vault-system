import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import {globalErrorHandler} from "./middlewares/globalErrorHandler.js";

const app = express();

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  limit: 100,
  windowMs: 1000 * 60 * 30,
  message: "Too many requests! Try again later",
});

app.use("/api", limiter);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v2/auth", authRouter);
app.use("/api/v2/users", userRouter);

app.use(globalErrorHandler);

export default app;
