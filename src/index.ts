import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

const videos = [
	{ id: 1, title: "About JS - 01", author: "it-incubator.eu" },
	{ id: 2, title: "About JS - 02", author: "it-incubator.eu" },
	{ id: 3, title: "About JS - 03", author: "it-incubator.eu" },
	{ id: 4, title: "About JS - 04", author: "it-incubator.eu" },
	{ id: 5, title: "About JS - 05", author: "it-incubator.eu" },
];

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
	res.send("lalala... zazaza ");
});

app.get("/videos/", (req: Request, res: Response) => {
	res.send(videos);
});

app.get("/videos/:videoId", (req: Request, res: Response) => {
	const id = +req.params.videoId;
	const foundVideo = videos.find((vidos) => vidos.id === id);
	if (!foundVideo) {
		res.status(400).json("No such video");
	}
	if (foundVideo) {
		res.send(
			`Video name is ${foundVideo.title}, and its author is ${foundVideo.author}`
		);
	}
});

app.post("/videos", (req: Request, res: Response) => {
	const newVideo = {
		id: +new Date(),
		title: req.body.title,
		author: "it-incubator.eu",
	};
	videos.push(newVideo);
	res.send(newVideo);
});

app.delete("/videos/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	const newVideoList = videos.filter((vidos) => vidos.id !== +id);
	res.send(newVideoList);
});

app.put("/videos/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	const { title } = req.body;
	const newVideoList = videos.map((el) =>
		el.id === +id ? { ...el, title } : el
	);
	res.send(newVideoList);
});

app.listen(port, () => {
	console.log(`Server has started on ${port} port`);
});
