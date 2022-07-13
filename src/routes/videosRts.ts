import {
  Request,
  Response,
  Router,
} from "express";
import { videos } from "../temporaryData";
import { errorHandler } from "../utils/error-handler";

const videosRouter = Router({});

videosRouter.get("/", (req: Request, res: Response) => {
  res.send(videos);
});

videosRouter.get("/:videoId", (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const foundVideo = videos.find((vidos) => vidos.id === id);
  if (!foundVideo) {
    res.status(404).send("Not Found");
  }
  if (foundVideo) {
    res.send(foundVideo);
  }
});

videosRouter.post("/", (req: Request, res: Response) => {
  if (!req.body.title) {
    errorHandler(res, 400, "No title", "title");
  }
  if (req.body.title.length > 40) {
    errorHandler(res, 400, "title has more then 40 characters", "title");
  }
  const newVideo = {
    id: +new Date(),
    title: req.body.title,
    author: "it-incubator.eu",
  };
  videos.push(newVideo);
  res.status(201).send(newVideo);
});

videosRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundId = videos.find((item) => +id === item.id);
  if (!foundId) {
    res.status(404).send();
  }
  const foundElement = videos.find((el) => el.id === +id);
  if (foundElement) {
    const currentIndex = videos.indexOf(foundElement);
    videos.splice(currentIndex, currentIndex + 1);
    console.log(videos);
    res.status(204).send(videos);
  }
});

videosRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const foundItemById = videos.find((item) => +id === item.id);
  if (!foundItemById) {
    res.status(404).send("Not Found");
  }
  if (!title) {
    errorHandler(res, 400, "No title", "title");
  }
  if (title.length > 40) {
    errorHandler(res, 400, "title has more then 40 characters", "title");
  }

  if (foundItemById) {
    foundItemById.title = title;
  }

  res.status(204).send(foundItemById);
});

export default videosRouter;
