import { describe, expect, it, vi } from "vitest";
import { ProtoManaging } from "../../services/proto-managing";
import { MangaPlusScraper } from "./mangaplus-scraper";

describe("mangaplus-scraper", () => {
  it("should call ProtoManaging httpGetProtoFile when get all chapters", async () => {
    vi.spyOn(ProtoManaging, "httpGetProtoFile");

    await MangaPlusScraper.getLatestChapters();

    expect(ProtoManaging.httpGetProtoFile).toHaveBeenCalled();
  });

  it("should call ProtoManaging httpGetProtoFile with correct endpoint when get all chapters", async () => {
    vi.spyOn(ProtoManaging, "httpGetProtoFile");

    await MangaPlusScraper.getLatestChapters();

    expect(ProtoManaging.httpGetProtoFile).toHaveBeenCalledWith(
      `https://jumpg-webapi.tokyo-cdn.com/api/web/web_homeV3?lang=fra`
    );
  });

  it("should call ProtoManaging loadProtoFileAsync when get all chapters", async () => {
    vi.spyOn(ProtoManaging, "loadProtoFileAsync");

    await MangaPlusScraper.getLatestChapters();

    expect(ProtoManaging.loadProtoFileAsync).toHaveBeenCalled();
  });
});
