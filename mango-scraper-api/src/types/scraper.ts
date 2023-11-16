import Chapter from "./Chapter";
import Manga from "./Manga";

export default interface Scraper {
  getLatestChapters: () => Promise<Chapter[]>;
  getMangas: ({ q }: { q?: string }) => Promise<Manga[]>;
  getManga: (name: string) => Promise<Manga>;
}
