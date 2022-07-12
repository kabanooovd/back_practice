import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import videosRouter from "./routes/videosRts";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use("/videos", videosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("DIMAAAAAASSS !!! diiiiiiiimas");
});

app.listen(port, () => {
  console.log(`Server has started on ${port} port`);
});

// "dev": "nodemon --inspect .\\dist\\index.js",
