import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import quizRoutes from "./routes/quizRoutes";
import specializationRoutes from "./routes/specializationRoutes";
import roleModelRoutes from "./routes/roleModelRoutes";
import path from "path";
import multiplierRoutes from "./routes/multiplierRoutes";
import homepageRoutes from "./routes/homepageRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/multiplier", multiplierRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/specializations", specializationRoutes);
app.use("/api/role-models", roleModelRoutes);
app.use(
  "/api/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);
app.use("/api/homepage", homepageRoutes);

export default app;
