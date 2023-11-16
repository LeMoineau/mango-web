import { Router, Request, Response } from "express";
import ChaptersController from "../controllers/chapters-controller";

const router = Router();
const chaptersController = new ChaptersController();

router.get("/", async (_: Request, res: Response) => {
  try {
    res.send(await chaptersController.getAll());
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
