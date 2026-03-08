import { setupServer } from "msw/node";
//node version of msw (Mock service worker - Fake API)
import { handlers } from "./handlers.js";
//routes for api
export const server = setupServer(...handlers);