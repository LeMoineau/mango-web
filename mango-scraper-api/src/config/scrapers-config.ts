import mangaPlusScraper from "../scrapers/mangaplus/mangaplus-scraper";
import { ScrapersConfig } from "../types/scrapersConfig";

export default {
  scrapers: {
    mangaplus: {
      enabled: true,
      trustLevel: 1,
      scraper: mangaPlusScraper,
    },
  },
} as ScrapersConfig;
