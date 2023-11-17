import axios from "axios";
import Chapter from "../../types/chapter";
import Manga from "../../types/manga";
import Scraper from "../scraper";
import * as cheerio from "cheerio";
import { ScrapingUtils } from "../../services/scraping-utils";
import { ArrayUtils } from "../../services/array-utils";

class MangaSakiScraper implements Scraper {
  private PAGE_URL = process.env.MANGASAKI_URL ?? "https://mangasaki.org";
  async getLatestChapters(): Promise<Chapter[]> {
    const $ = await ScrapingUtils.requestToCheerioPage(this.PAGE_URL);
    const chapters = ScrapingUtils.cheerioToJson($.html(), {
      selector: "ul#latest-list > li",
      value: [
        {
          image: {
            selector: "a:first-child img",
            value: "src",
          },
          selector: ".item-list ul li",
          value: {
            manga: {
              title: {
                selector: ".tl a strong",
                value: "text",
              },
              id: {
                selector: ".tl a",
                value: (element: cheerio.Cheerio<any>) => {
                  console.log("salut", element.html());
                  return ArrayUtils.getLastOf(element.attr("href")!.split("/"));
                },
              },
            },
            selector: ".item-list ul li:nth-child(1) a",
            value: {
              title: "text",
              number: (element: cheerio.Cheerio<any>) => {
                console.log("salut2", element.html());
                return ArrayUtils.getLastOf(element.text().split(" "));
              },
              id: (element: cheerio.Cheerio<any>) => {
                console.log("salut3", element.html());
                return ArrayUtils.getLastOf(element.attr("href")!.split("/"));
              },
            },
          },
        },
      ],
    });
    console.log("chapters", chapters);
    return [];
  }
  async getMangas({ q }: { q?: string | undefined }): Promise<Manga[]> {
    throw Error("not yet implemented");
  }
  async getManga(name: string): Promise<Manga> {
    throw Error("not yet implemented");
  }
}

export default new MangaSakiScraper();
