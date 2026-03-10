import request from "supertest";
import app from "../app.js"
import { describe, it, expect } from "vitest";

describe("Health endpoint", () => {

  it("should return OK", async () => {
    const res = await request(app).get("/health")

    expect(res.status).toBe(200)
  })

})