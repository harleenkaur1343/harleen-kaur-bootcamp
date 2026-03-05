import { express } from "express";
import dotenv from "dotenv";
;
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello express");
});
app.get("/ping", (req, res) => {
    res.json({ ok: true });
});
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
process.on("SIGINT", () => {
    console.log("Shutting down server");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
//# sourceMappingURL=all-drills.js.map