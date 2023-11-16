import { ProtoManaging } from "../../services/proto-managing";
import Chapter from "../../types/chapter";
import Manga from "../../types/manga";
import Scraper from "../scraper";
import { MangaPlusCard } from "./types/card";
import { MangaPlusChapter } from "./types/chapter";
import { MangaPlusSection } from "./types/section";

const MANGAPLUS_URL: string =
  process.env.MANGAPLUS_URL ?? "https://jumpg-webapi.tokyo-cdn.com/api";

export const MangaPlusScraper: Scraper = {
  getLatestChapters: async (): Promise<Chapter[]> => {
    const res = await ProtoManaging.httpGetProtoFile(
      `${MANGAPLUS_URL}/web/web_homeV3?lang=fra`
    );
    const Message = await ProtoManaging.loadProtoFileAsync(
      "./src/scrapers/mangaplus/protos/web_homeV3.proto",
      "mangaplus.Web_homeV3"
    );
    const jsonRes = Message.decode(res).toJSON();
    const chapters: Chapter[] = [];
    for (let s of jsonRes.parent.data.sections) {
      chapters.push(
        ...s.cards.map((c: MangaPlusCard) => {
          return {
            ...c.chapter,
            number: Number(c.chapter.chapter.split("#")[1]),
            mangaName: c.mangaTitle,
          } as Chapter;
        })
      );
    }
    return chapters;
  },
  getMangas: function ({ q }: { q?: string | undefined }): Promise<Manga[]> {
    throw new Error("Function not implemented.");
  },
  getManga: function (name: string): Promise<Manga> {
    throw new Error("Function not implemented.");
  },
};
