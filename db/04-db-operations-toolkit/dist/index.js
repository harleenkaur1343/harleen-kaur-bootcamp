"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_status_route_1 = __importDefault(require("./admin/db-status.route"));
const app = (0, express_1.default)();
app.use("/health", db_status_route_1.default);
app.listen(4000, () => {
    console.log("Listening on localhost:4000");
});
//# sourceMappingURL=index.js.map