// import express from "express";
// import { Request, Response, NextFunction } from "express";
// import dotenv from "dotenv";
// import http from "http";
// import path from "path";
// import userRouter from "./routes/userRoutes.js";
// import { fileURLToPath } from "url";
// import taskRoutes from "./routes/taskRoutes.js";
// import { errorHandler } from "../src/middleware/errorHandler.js";
// import { any } from "zod";
// import { requestLogger } from "./middleware/requestLogger.js";
// import swaggerUi from "swagger-ui-express";
// import { openapiSpec } from "./docs/openapi.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // to check if we can send the request PUT - /users first sends OPTIONS /users -
// // sent when
// // Method is not GET/POST, Custom headers are used
// // Content-Type is not:
// // application/x-www-form-urlencoded, multipart/form-data, text/plain
// // app.options("/*",(req: Request, res: Response)=>{
// //   res.sendStatus(204)
// // })
// //app.use("/special", cors());

// // Admin API - restrict origin
// //app.use(express.json({ limit: "1mb" }));
// //parse json
// //data received in stream of bytes
// //chunks to string
// //parse string to js object
// //add to req.body

// app.use(express.urlencoded({ extended: true }));
// //urlencoded is body‑parser middleware for application/x-www-form-urlencoded data.
// //username=alice&password=123 converted to
// //{ username: "alice", password: "123" }
// //extended true allows nested objects and arrays user[name]=harsh instead of just kval pairs
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use((req: Request, res: Response, next: NextFunction) =>{
//   res.setHeader("Access-Control-Allow-Origin","*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type")
//  next();
// })
// // app.use((req: Request, res: Response, next: NextFunction) => {
// //   req.requestId = crypto.randomUUID();
// //   console.log(
// //     `Log the request method ${req.method} and url ${req.url}. Assigned ID is ${req.requestId}`,
// //   );
// //   next();
// // });

// // timer middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const start = Date.now();

//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     console.log(`Time taken ${req.method} ${req.url} - ${duration}ms`);
//   });
//   next();
// });

// //PINO LOGGER
// app.use(requestLogger);

// app.use("/api/users", userRouter);
// app.use("/tasks", taskRoutes);
// const onlyForSpecial = (req: Request, res: Response, next: NextFunction) => {
//   console.log("Special middleware triggered");
//   next();
// };
// app.use(express.static(path.join(__dirname, "../public")));
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
// console.log(path.join(__dirname, "../public"));
// // app.get("/special", onlyForSpecial, (req: Request, res: Response) => {
// //   res.json({ message: "Special route", requestId: req.requestId });
// // });
// //app.use - applies to all the routes

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello express");
// });

// app.get("/ping", (req: Request, res: Response) => {
//   res.json({ ok: true });
// });

// app.post("/echo", (req: Request, res: Response) => {
//   res.json({
//     message: "Received body",
//     body: req.body,
//   });
// });

// app.get("/docs/openapi.json", (req, res) => {
//   res.json(openapiSpec);
// });
// //express error handling middleware
// //err - error object passed via next(err) or thrown in a route

// //D3

// app.get("/ok", (req: Request, res: Response) => {
//   res.status(200).json({ message: "Everything is fine" });
// });

// app.post("/create", (req: Request, res: Response) => {
//   res.status(201).json({ message: "Resource created" });
// });

// app.get("/bad", (req: Request, res: Response) => {
//   res.status(400).json({ error: "Bad request example" });
// });

// app.get("/missing", (req: Request, res: Response) => {
//   res.status(404).json({ error: "Not found example" });
// });

// // app.get("/headers", (req: Request, res: Response) => {
// //   res
// //     .set("Cache-Use", "no")
// //     .set("Test-Header", "demoval")
// //     .status(200)
// //     .send("Custom header");
// // });

// app.get("/file", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "..", "public", "sample.txt"));
// });

// app.get("/old-route", (req: Request, res: Response) => {
//   res.redirect(302, "/new-route");
// });

// app.get("/new-route", (req: Request, res: Response) => {
//   res.send("You have been redirected.");
// });

// app.get("/error", (req: Request, res: Response) => {
//   throw new Error("Something went wrong!");
// });
// app.get("/async-error", async (req: Request, res: Response) => {
//   throw new Error("Something went wrong in async !");
// });

// // app.use((err: any, req: Request, res: Response, next: NextFunction) => {
// //   //console.log("Error caught", err);
// //   if (err instanceof SyntaxError) {
// //     return res.status(400).json({
// //       error: "Malformed JSON",
// //     });
// //   } else {
// //     const isDev = process.env.NODE_ENV === "development";
// //     res.status(err.statusCode ?? 500).json({
// //       success: false,
// //       message: err.message ?? "Internal Server Error",
// //       ...(isDev && { stack: err.stack }),
// //     });
// //   }

// //   // next(err);
// // });

// app.use(errorHandler);
// // Express catches the thrown error
// // Passes it to error middleware
// // does not handle rejected promises automatically

// //middleware - function which runs before the route handler modifies req,res,, uses next() to continue, send a response to stop
// const server: http.Server = app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// process.on("SIGINT", () => {
//   console.log("Shutting down server");
//   server.close(() => {
//     console.log("Server closed.");
//     process.exit(0);
//   });
// });
