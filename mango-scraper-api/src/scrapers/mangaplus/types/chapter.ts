import Chapter from "../../../types/chapter";
import { MangaPlusManga } from "./manga";

export interface MangaPlusChapter extends Chapter {
  id: number;
  manga: MangaPlusManga;
  chapter: string;
}
