import scrapersConfig from "../config/scrapers-config";
import Scraper from "../scrapers/scraper";
import { ScraperName, ScrapersConfig } from "../types/scrapersConfig";

class ScraperController {
  private scrapersEnabled: { [scraperName in ScraperName]: Scraper } = {};
  private trustedScrapers: { [index: number]: ScraperName } = [];

  constructor(options: ScrapersConfig) {
    for (let scraperName of Object.keys(options.scrapers)) {
      const targetScraper = options.scrapers[scraperName];
      if (!targetScraper.enabled) {
        continue;
      }
      this.scrapersEnabled[scraperName] = targetScraper.scraper;
      this.trustedScrapers[targetScraper.trustLevel] = scraperName;
    }
  }

  public async getLatestChaptersOfAllScrapers() {
    const chapters = [];
    for (let scraperName of Object.keys(this.scrapersEnabled)) {
      const scraperChapters =
        await this.scrapersEnabled[scraperName].getLatestChapters();
      for (let c of scraperChapters) {
      }
    }
  }
}

export default new ScraperController(scrapersConfig);
