import http from "node:http";

const server = http.createServer((req, res) => {
  res.end("Server is running\n");
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});


function shutdown(signal: string) {
  console.log(`\n ${signal} received. Closing server...`);

  server.close(() => {
    console.log("Server closed");
    console.log("goodbye");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);