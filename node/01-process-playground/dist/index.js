import { Command } from "commander";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
const __filename = fileURLToPath(import.meta.url);
dotenv.config();
const program = new Command();
program.name("info").description("Process playgroound CLI").version("1.0.0");
program.option("--debug", "Auto-launch with Node inspector");
//It runs automatically at specific moments in a command’s execution
program.hook("preAction", (thisCommand) => {
    const opts = thisCommand.opts();
    const args = process.argv.slice(2);
    if (opts.debug && !process.execArgv.includes("--inspect")) {
        const filteredArgs = args.filter(arg => arg !== "--debug");
        const child = spawn(process.execPath, ["--inspect", process.argv[1], ...filteredArgs], { stdio: "inherit" });
        process.exit(0);
    }
});
program
    .command("process")
    .description("Log process info")
    .action(() => {
    console.log("Process Info");
    console.log("PID:", process.pid);
    console.log("Node Version:", process.version);
    console.log("Working Directory:", process.cwd());
});
program
    .command("config")
    .description("Print .env configuration")
    .action(() => {
    const config = {
        appName: process.env.APP_NAME ?? "DefaultApp",
        env: process.env.APP_ENV ?? "production",
        port: process.env.PORT ?? "8080",
    };
    console.log("=== Config (.env) ===");
    console.log(config);
});
program
    .command("args")
    .description("Print the provided arguments")
    .argument("<values...>")
    .action((values) => {
    console.log("Arguments");
    console.log(values);
});
process.on("SIGINT", () => {
    console.log("Shut down");
    process.exit(0);
});
program.parse();
//# sourceMappingURL=index.js.map