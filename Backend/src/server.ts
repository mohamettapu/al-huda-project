import userRoutes from "./Routes/userRoutes";

import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/user", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`the app is using on port ${PORT}`));
