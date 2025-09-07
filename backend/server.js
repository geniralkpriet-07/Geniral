import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/database.js";
import { corsOptions, helmetOptions, rateLimitOptions } from "./config/security.js";
import { createAdminUser } from "./controllers/authController.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import associationHeadRoutes from "./routes/associationHeadRoutes.js"; 
import associationHeadAdminRoutes from "./routes/associationHeadRoutesAdmin.js"; 
import clubRoutes from "./routes/clubRoutes.js"; 
import clubRoutesAdmin from "./routes/clubRoutesAdmin.js"; 
import executiveMemberRoutes from "./routes/executiveMemberRoutes.js"; // Add this
import executiveMemberRoutesAdmin from "./routes/executiveMemberRoutesAdmin.js"; // Add this
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
app.use("/api", eventRoutes);
app.use("/api/association-members", associationHeadRoutes);
app.use("/api/clubs", clubRoutes); 
app.use("/api/executive-members", executiveMemberRoutes); // Add this

app.use("/admin", adminRoutes);
app.use("/admin/association-heads", associationHeadAdminRoutes);
app.use("/admin/clubs", clubRoutesAdmin); 
app.use("/admin/executive-members", executiveMemberRoutesAdmin); // Add this

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
