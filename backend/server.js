import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/database.js";
import { corsOptions, helmetOptions, rateLimitOptions } from "./config/security.js";
import { createAdminUser } from "./controllers/authController.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 7000;
const app = express();

app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(rateLimit(rateLimitOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

connectDB().then(() => {
  createAdminUser();
});

app.use("/", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
