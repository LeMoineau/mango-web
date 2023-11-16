import { MangaPlusChapter } from "./chapter";

export interface MangaPlusCard {
  mangaTitle: string;
  latestChapter: string;
  chapter: MangaPlusChapter;
}
