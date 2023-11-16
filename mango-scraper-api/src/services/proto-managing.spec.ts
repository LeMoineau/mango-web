import { describe, expect, it, vi } from "vitest";
import { ProtoManaging } from "./proto-managing";
import protobufjs, { Root, Type } from "protobufjs";

describe("proto-managing", () => {
  const A_FILENAME = "test.proto";
  const A_TYPE_NAME = "scraper.type";
  const A_ROOT: Root = {
    lookupType: vi.fn(),
  } as unknown as Root;
  const A_TYPE: Type = {} as Type;
  const AN_ERROR_MESSAGE = "a error";

  it("should call protobufjs load when loading proto file async", () => {
    vi.spyOn(protobufjs, "load").mockImplementation(async () => A_ROOT);

    ProtoManaging.loadProtoFileAsync(A_FILENAME, A_TYPE_NAME);

    expect(protobufjs.load).toHaveBeenCalledWith(A_FILENAME, expect.anything());
  });
});
