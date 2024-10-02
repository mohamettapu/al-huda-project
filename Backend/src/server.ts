import userRoutes from "./Routes/userRoutes";
import teacherRoutes from "./Routes/teacherRoutes";
import EvaluationRoute from "./Routes/evaluationRoutes";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/Evaluation", EvaluationRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`the app is using on port ${PORT}`));
