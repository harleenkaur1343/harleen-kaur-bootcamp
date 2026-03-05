function syncError() {
    throw new Error("Sync failed");
}
async function madeToFail() {
    return Promise.reject(new Error("Async failure from promise"));
}
//sync error
try {
    syncError();
}
catch (err) {
    console.error("Caught sync error:", err.message);
}
//async error
madeToFail().catch((err) => {
    console.error("Caught async error with .catch:", err.message);
});
function shutdown(code = 1) {
    console.log("Exited");
    process.exit(code);
}
process.on("uncaughtExecption", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err.message);
    shutdown(1);
});
process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
    shutdown(1);
});
export {};
//Promise.reject(new Error("Forgot to handle me"));
//setTimeout(() => {
//   throw new Error("Boom outside try/catch");
// }, 1000);
//# sourceMappingURL=d6.js.map