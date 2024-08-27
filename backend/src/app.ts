import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
// import quizRouter from './routes/quizRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
// app.use('/api/quiz', quizRouter);
export default app;
