import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import quizRoutes from "./routes/quizRoutes";
import specializationRoutes from "./routes/specializationRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/spec', specializationRoutes);
export default app;
