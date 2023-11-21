import IntersiteChapter from "../types/IntersiteChapter";
import scraperController from "./scraper-controller";

export default class ChaptersController {
  public constructor() {}

  public async getAll(): Promise<IntersiteChapter[]> {
    return await scraperController.getLatestChaptersOfAllScrapers();
  }
}
