import { beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { chaptersController } from "./chapters-routes";
import express from "express";
import chaptersRouter from "./chapters-routes";

describe("chapters-routes", () => {
  const AN_ERROR = "une erreur";
  const app = express();

  beforeAll(() => {
    app.use("/chapters", chaptersRouter);
  });

  it("should call ChaptersController getAll", async () => {
    vi.spyOn(chaptersController, "getAll");

    await request(app).get("/chapters");

    expect(chaptersController.getAll).toHaveBeenCalled();
  });

  it("should return ok status when getting not error", async () => {
    vi.spyOn(chaptersController, "getAll").mockResolvedValue([]);

    await request(app).get("/chapters").expect(200);
  });

  it("should return 500 status when getting error", async () => {
    vi.spyOn(chaptersController, "getAll").mockRejectedValue(AN_ERROR);

    await request(app).get("/chapters").expect(500);
  });
});
