import { beforeEach, describe, expect, it } from "vitest";
import { ArrayUtils } from "./array-utils";

describe("array-utils", () => {
  let AN_ARRAY: any[] = [];
  const THE_LAST_ITEM = 4;

  beforeEach(() => {
    AN_ARRAY = [1, 2, 3];
  });

  it("should return last of array", () => {
    AN_ARRAY.push(THE_LAST_ITEM);
    const res = ArrayUtils.getLastOf(AN_ARRAY);

    expect(res).toBe(THE_LAST_ITEM);
  });
});
