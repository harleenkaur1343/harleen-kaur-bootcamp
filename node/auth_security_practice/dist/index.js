import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import { fileURLToPath } from "url";
import { closeDb } from "./db/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
    res.send("Hello express");
});
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
process.on("SIGINT", () => {
    console.log("Shutting down server");
    server.close(() => {
        closeDb();
        console.log("Server closed.");
        process.exit(0);
    });
});
//# sourceMappingURL=index.js.map