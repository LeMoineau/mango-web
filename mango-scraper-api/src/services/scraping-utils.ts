import axios from "axios";
import WrongScrapersConfigError from "../errors/WrongScrapersConfigError";
import { ScrapersConfig } from "../types/scrapersConfig";
import * as cheerio from "cheerio";
import { JsonObject } from "../types/jsonObject";
import UnknownCheerioMethod from "../errors/UnknownCheerioMethod";

export namespace ScrapingUtils {
  export function verifyConfig(config: ScrapersConfig) {
    const trustLevels: number[] = [];
    for (let scraperName of Object.keys(config.scrapers)) {
      const targetScraper = config.scrapers[scraperName];
      if (!targetScraper.enabled) {
        continue;
      }
      if (trustLevels.includes(targetScraper.trustLevel)) {
        throw new WrongScrapersConfigError(
          "same trustLevel for at least 2 of enabled scrapers"
        );
      }
      trustLevels.push(targetScraper.trustLevel);
    }
  }

  export async function requestToCheerioPage(
    url: string
  ): Promise<cheerio.CheerioAPI> {
    return await axios.get(url).then((res) => cheerio.load(res.data));
  }

  export function cheerioToJson(
    html: string,
    objectStructure: JsonObject
  ): JsonObject | JsonObject[] | string | undefined {
    const res: JsonObject = {};
    const $ = cheerio.load(html);
    for (let key of Object.keys(objectStructure)) {
      if (key === "selector" || key === "value") {
        continue;
      }
      console.log(key);
      if (typeof objectStructure[key] === "string") {
        console.log("1", html, $.html());
        res[key] = cheerioMethodOnHTMLElement($.root(), objectStructure[key]);
        console.log(res[key]);
      } else if (typeof objectStructure[key] === "function") {
        console.log("2");
        res[key] = objectStructure[key]($().parent());
        console.log(res[key]);
      } else if (typeof objectStructure[key] === "object") {
        console.log("3");
        res[key] = cheerioToJson($.html(), objectStructure[key]);
        console.log(res[key]);
      }
    }
    if (
      objectStructure.selector !== undefined &&
      objectStructure.value !== undefined
    ) {
      if (Array.isArray(objectStructure.value)) {
        const array: any[] = [];
        console.log("4");
        $()
          .children(objectStructure.selector)
          .each((_, e) => {
            console.log("first element");
            array.push(
              cheerioToJson(cheerio.load(e).html(), objectStructure.value[0])
            );
          });
        return array;
      }
      const selectedElement = $().children(objectStructure.selector);
      console.log(selectedElement);
      if (typeof objectStructure.value === "string") {
        console.log("5");
        return cheerioMethodOnHTMLElement(
          selectedElement,
          objectStructure.value
        );
      } else if (
        !Array.isArray(objectStructure.value) &&
        typeof objectStructure.value === "object"
      ) {
        console.log("6");
        return cheerioToJson(selectedElement.html()!, objectStructure.value);
      }
    }
    console.log(res);
    return res;
  }

  export function cheerioMethodOnHTMLElement(
    element: cheerio.Cheerio<any>,
    method: string
  ) {
    if (method === "text") return element.text();
    if (method === "href") return element.attr("href");
    if (method === "src") return element.attr("src");
    throw new UnknownCheerioMethod(method);
  }
}
