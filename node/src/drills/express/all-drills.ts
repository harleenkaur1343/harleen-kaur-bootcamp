import express from "express";
import {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({limit:"1mb"}));
//parse json 
//data received in stream of bytes 
//chunks to string 
//parse string to js object 
//add to req.body 

app.use(express.urlencoded({ extended: true }));
//urlencoded is body‑parser middleware for application/x-www-form-urlencoded data.
//username=alice&password=123 converted to 
//{ username: "alice", password: "123" }
//extended true allows nested objects and arrays user[name]=harsh instead of just kval pairs

app.get("/",(req : Request,res : Response)=>{
  res.send("Hello express")
})

app.get("/ping", (req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post("/echo", (req: Request, res: Response) => {
  res.json({
    message: "Received body",
    body: req.body
  });
});

//express error handling middleware 
//err - error object passed via next(err) or thrown in a route
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: "Malformed JSON"
    });
  }

  next(err);
});

//D3 

app.get("/ok", (req:Request, res:Response) => {
  res.status(200).json({ message: "Everything is fine" });
});

app.post("/create", (req:Request, res:Response) => {
  res.status(201).json({ message: "Resource created" });
});

app.get("/bad", (req:Request, res:Response) => {
  res.status(400).json({ error: "Bad request example" });
});

app.get("/missing", (req:Request, res:Response) => {
  res.status(404).json({ error: "Not found example" });
});

app.get("/headers",(req:Request, res:Response)=>{
  res.set("Cache-Use","no").set("Test-Header","demoval").status(200).send("Custom header")
})

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

app.get("/file", (req:Request, res:Response) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "sample.txt")
  );
});

const server: http.Server = app.listen(PORT,()=>{
  console.log( `Server running at http://localhost:${PORT}`);
})


process.on("SIGINT",()=>{
  console.log("Shutting down server");
  server.close(()=>{
    console.log("Server closed.");
    process.exit(0);
  })
})

