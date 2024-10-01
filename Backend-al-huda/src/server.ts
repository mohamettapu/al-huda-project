import express, { Request, Response } from "express";

// import  from "express";
const app = express();
app.get("/api", (req: Request, res: Response) => {
  res.json({ fruits: ["bananna"] });
});

app.listen(9000, () => console.log(`app is runing on ${9000}`));
