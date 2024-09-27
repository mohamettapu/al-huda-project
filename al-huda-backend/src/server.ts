import express from "express";

import dotenv from "dotenv";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`al-huda app is running on ${PORT}`));
