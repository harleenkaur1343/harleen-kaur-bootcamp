import {beforeAll, afterAll} from "vitest";
import { startContainer, stopContainer} from "./src/tests/setup/containers.js"

beforeAll(async ()=>{
  await startContainer();
})

afterAll(async () => {
  await stopContainer()
})
