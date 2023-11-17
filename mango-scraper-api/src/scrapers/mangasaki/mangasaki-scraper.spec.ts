import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import mangasakiScraper from "./mangasaki-scraper";

describe("mangasaki-scraper", () => {
  it("should request get with correct arguments when getting latest chapters", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: "" });

    await mangasakiScraper.getLatestChapters();

    expect(axios.get).toHaveBeenCalledWith(mangasakiScraper["PAGE_URL"]);
  });
});
