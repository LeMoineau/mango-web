import { describe, expect, it } from "vitest";
import scraperController from "./scraper-controller";
import scrapersConfig from "../config/scrapers-config";

describe("scraper-controller", () => {
  it("should store enabled scrapers from config when initialize", () => {
    for (let scraperName of Object.keys(scrapersConfig.scrapers)) {
      if (scrapersConfig.scrapers[scraperName].enabled) {
        expect(scraperController["scrapersEnabled"][scraperName]).toBe(
          scrapersConfig.scrapers[scraperName].scraper
        );
      }
    }
  });

  it("should store scraper trustLevels from config when initialize", () => {
    for (let scraperName of Object.keys(scrapersConfig.scrapers)) {
      if (scrapersConfig.scrapers[scraperName].enabled) {
        expect(
          scraperController["trustedScrapers"][
            scrapersConfig.scrapers[scraperName].trustLevel
          ]
        ).toBe(scraperName);
      }
    }
  });

  it("should call getLatestChapters of every enabled chapters when getting latests chapters of all scrapers", () => {});
});
