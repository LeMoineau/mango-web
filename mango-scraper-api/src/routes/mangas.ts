import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {});
router.get("/:name/", async (req: Request, res: Response) => {});
router.get("/:name/chapters", async (req: Request, res: Response) => {});

export default router;
