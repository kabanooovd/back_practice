import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import videosRouter from "./routes/videosRts";

const app = express();
const port = process.env.PORT || 5000;

const videos = [
  { id: 1, title: "About JS - 01", author: "it-incubator.eu" },
  { id: 2, title: "About JS - 02", author: "it-incubator.eu" },
  { id: 3, title: "About JS - 03", author: "it-incubator.eu" },
  { id: 4, title: "About JS - 04", author: "it-incubator.eu" },
  { id: 5, title: "About JS - 05", author: "it-incubator.eu" },
];

app.use(cors());

app.use(bodyParser.json());

app.use("/videos", videosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("application built, deployed and started successfuly !!! check");
});

app.listen(port, () => {
  console.log(`Server has started on ${port} port`);
});

// "dev": "nodemon --inspect .\\dist\\index.js",
