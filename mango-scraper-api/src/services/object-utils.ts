import { JsonObject } from "../types/jsonObject";

export namespace ObjectUtils {
  export function forEachKeyInObject(
    object: JsonObject,
    callback: (key: string, value: any) => void
  ) {
    for (let key of Object.keys(object)) {
      callback(key, object[key]);
    }
  }
}
