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
    const $ = await ScrapingUtils.requestToCheerioPage(
      "https://www.mangasaki.org/"
    );
    const chapters: any[] = [];
    $("ul#latest-list > li").each((_, e) => {
      let $2 = cheerio.load(e);
      const res: any = {};
      res.image = $2("a:first-child img").attr("src");
      const e2 = $2(".item-list ul li");
      res.e2html = e2.html();
      let $3 = cheerio.load(e2.html()!);
      res.manga = {
        title: $3(".tl a strong").text(),
        id: $3(".tl a").attr("href"),
      };
      const e3 = $3(".item-list ul li:nth-child(1)");
      res.e3html = e3.html();
      let $4 = cheerio.load(e3.html()!);
      res.title = $4.text();
      res.number = ArrayUtils.getLastOf($4.text().split(" "));
      res.r4html = $4.html();
      // res.id = ArrayUtils.getLastOf($4().parent().attr("href")!.split("/"));
      // $2("li").each((_, e2) => {
      //   let $3 = cheerio.load(e2);
      //   chapters.push({ a: $3("a").html(), b: $3("a img").attr("src") });
      // });
      chapters.push(res);
    });
    await mangasakiScraper.getLatestChapters();
    res.send(chapters);
    //res.send(await chaptersController.getAll());
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
