import { Router, Request, Response } from "express";
import ChaptersController from "../controllers/chapters-controller";

export const chaptersController = new ChaptersController();

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    res.send(await chaptersController.getAll());
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
