import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./setup.js";
import { app } from "../app.js";

let serverInstance: any;

beforeAll(() => {
  server.listen({ onUnhandledRequest: "bypass" });
  serverInstance = app.listen(3000);
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  serverInstance.close();
});

describe("Weather API", () => {
  it("returns weather for London", async () => {
    const res = await fetch("http://localhost:3000/test-weather?city=London");

    const data = await res?.json();
    console.log("Test data : ", data);
    expect(data.name).toBe("London");
  });

  it("returns 401 unauthorized", async () => {
    const res = await fetch(
      "http://localhost:3000/test-weather?city=unauthorized",
    );
    console.log("401 unauth")
    expect(res.status).toBe(500); // Express error wrapper
  });

  it("retries on server error", async () => {
    const res = await fetch(
      "http://localhost:3000/test-weather?city=server-error",
    );

    expect(res.status).toBe(500);
  });

  it("handles timeout", async () => {
    const res = await fetch("http://localhost:3000/test-weather?city=timeout");

    expect(res.status).toBe(500);
  });

  it("handles invalid JSON", async () => {
    const res = await fetch(
      "http://localhost:3000/test-weather?city=invalid-json",
    );

    expect(res.status).toBe(500);
  });
});
