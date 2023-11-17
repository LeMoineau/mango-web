import { describe, expect, it, vi } from "vitest";
import ChaptersController from "./chapters-controller";
import mangaPlusScraper from "../scrapers/mangaplus/mangaplus-scraper";

describe("chapters-controller", () => {
  const chaptersController = new ChaptersController();
  it("should call MangaPlusScraper getLatestChapters method", async () => {
    vi.spyOn(mangaPlusScraper, "getLatestChapters");

    await chaptersController.getAll();

    expect(mangaPlusScraper.getLatestChapters).toHaveBeenCalled();
  });
});
