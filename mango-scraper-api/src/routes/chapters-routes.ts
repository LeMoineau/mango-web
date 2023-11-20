import { Router, Request, Response } from "express";
import ChaptersController from "../controllers/chapters-controller";
import mangasakiScraper from "../scrapers/mangasaki/mangasaki-scraper";
import { ScrapingUtils } from "../services/scraping-utils";
import * as cheerio from "cheerio";
import { ArrayUtils } from "../services/array-utils";

export const chaptersController = new ChaptersController();

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    await mangasakiScraper.getLatestChapters();
    const $ = await ScrapingUtils.requestToCheerioPage("https://mangasaki.org");
    res.send($.html());
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
