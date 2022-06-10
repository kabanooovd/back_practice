import { Request, Response, Router } from "express";
import { videos } from "../temporaryData";

const videosRouter = Router({});

videosRouter.get("/", (req: Request, res: Response) => {
	res.send(videos);
});

videosRouter.get("/:videoId", (req: Request, res: Response) => {
	const id = +req.params.videoId;
	const foundVideo = videos.find((vidos) => vidos.id === id);
	if (!foundVideo) {
		res.status(400).json("No such video");
	}
	if (foundVideo) {
		res.send(
			// `Video name is ${foundVideo.title}, and its author is ${foundVideo.author}`
            foundVideo
		);
	}
});

videosRouter.post("/", (req: Request, res: Response) => {
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
	const newVideoList = videos.filter((vidos) => vidos.id !== +id);
	res.send("video has been removed");
});

videosRouter.put("/:id", (req: Request, res: Response) => {
    	const { id } = req.params;
    	const { title } = req.body;
    	const newVideoList = videos.map((el) =>
    		el.id === +id ? { ...el, title } : el
    	);
    	res.send(newVideoList);
    });

export default videosRouter;
