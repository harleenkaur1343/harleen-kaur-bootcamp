import { beforeEach, afterEach } from "vitest";
import { createTestDB, closeTestDB } from "./test-db";

beforeEach(()=>{
  createTestDB();
});

afterEach(() => {
  closeTestDB();
});