import {
  ErrorRequestHandler,
  NextFunction,
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
    res.send(
      // `Video name is ${foundVideo.title}, and its author is ${foundVideo.author}`
      foundVideo
    );
  }
});

videosRouter.post("/", (req: Request, res: Response) => {
  if (!req.body.title) {
    errorHandler(res, 400, "No title", "VIDEOS");
  }
  if (req.body.title.length > 40) {
    errorHandler(res, 400, "title has more then 40 characters", "VIDEOS");
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
  // const newVideoList = videos.filter((vidos) => vidos.id !== +id);
  const foundElement = videos.find((el) => el.id === +id);
  if (foundElement) {
    const currentIndex = videos.indexOf(foundElement);
    videos.splice(currentIndex, currentIndex + 1);
    console.log(videos);
    res.status(204).send("video has been removed");
  }
});

// videosRouter.put("/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { title } = req.body;
//   const foundId = videos.find((item) => +id === item.id);
//   if (!foundId) {
//     res.status(404).send("Not Found");
//   }
//   if (!title) {
//     errorHandler(res, 400, "No title", "VIDEOS");
//   }
//   if (title.length > 40) {
//     errorHandler(res, 400, "title has more then 40 characters", "VIDEOS");
//   }
//   const newVideoList = videos.forEach((el) =>
//     el.id === +id ? { ...el, title } : el
//   );
//   res.status(204).json(newVideoList);
// });

videosRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const foundId = videos.find((item) => +id === item.id);
  if (!foundId) {
    res.status(404).send("Not Found");
  }
  if (!title) {
    errorHandler(res, 400, "No title", "VIDEOS");
  }
  if (title.length > 40) {
    errorHandler(res, 400, "title has more then 40 characters", "VIDEOS");
  }

  const foundElement = videos.find((el) => el.id === +id);

  if (foundElement) {
    const updatedItem = {
      id: foundElement.id,
      title,
      author: foundElement.author,
    };
    const currentIndex = videos.indexOf(foundElement);
    videos.splice(currentIndex, currentIndex + 1);
    videos.push(updatedItem);
  }

  res.status(204).send("KRUTO");
});

export default videosRouter;
