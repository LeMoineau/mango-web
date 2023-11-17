import Chapter from "../types/chapter";
import scraperController from "./scraper-controller";

export default class ChaptersController {
  public constructor() {}

  public async getAll(): Promise<Chapter[]> {
    //pour chaque src prendre les derniers chapitres
    //les mettre dans une meme liste triée par date de sortie
    //fusionner les doublons
    return [];
  }
}
