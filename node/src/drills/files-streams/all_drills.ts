//D1 - File basics
import {
  writeFile,
  appendFile,
  readFile,
  unlink,
  access,
} from "node:fs/promises";
import { constants, watch } from "node:fs";
import { createReadStream, createWriteStream } from "fs";
import { resolve } from "path";
import { UppercaseTransform } from "./upper-transform.js";
import { EventEmitter } from "events";

// async function run() {
//   const file = "test.txt";
//   await writeFile(file, "Hi\n");
//   await appendFile(file, "Appended text\n", "utf-8");

//   try {
//     await access(file, constants.F_OK);
//     const content = await readFile(file, "utf-8");
//     console.log("File contents \n ", content);
//   } catch {
//     console.log("File does not exist.");
//   }

//   await unlink(file);
//   console.log("File deleted.");

// }

// run().catch(console.error);

//D2 - JSON Handling
// async function saveJSON(path:string, data:unknown){
//  await writeFile(path,JSON.stringify(data,null,2),"utf-8")
// }
// //JS Object:     { port: 3000, debug: true }
// // ↓ stringify()
// // JSON String:   "{\n  \"port\": 3000,\n  \"debug\": true\n}"
// // ↓ writeFile()
// // config.json:   {
// //                  "port": 3000,
// //                  "debug": true
// //                }

// async function loadJSON<T>(path:string, defaults:T){
//   try{
//     const raw = await readFile(path,"utf-8");
//     console.log("Raw text",raw);
//     return JSON.parse(raw) as T;
//   }catch{
// return defaults;
//   }
// }
// async function main(){
//   await saveJSON("user.json",{name:"Harry Potter", place:"Hogwarts"})

//   const user = await loadJSON("user.json",{
//     name:"Arush",
//     place:"Delhi"
//   })

//   console.log("json file text", user.name)

// }

// main();

//D3 - Buffer and encodings
// const str = "Hi";
// const buffer = Buffer.from(str)
// const base64Form = buffer.toString("base64")
// //hexa - utf-8
// console.log(buffer);
// console.log(`In base64 format ${base64Form}`);
// console.log(`To string return : ${buffer.toString("utf-8")}`);
// const decoded = Buffer.from(base64Form, "base64").toString("utf8");
// console.log("Decoded from base64:", decoded);

// const buffer2 = Buffer.alloc(10,0xff) //255
// console.log(buffer2);
// console.log(`Buffer length ${buffer2.length}`);

// const text = "Hi";

// console.log("String length:", text.length);

// const buf = Buffer.from(text, "utf8");
// console.log("Buffer byte length:", buf.length);

//D4 - Readable Stream

// const filePath = resolve("./sample.txt");

// let chunkCount = 0;

// const stream = createReadStream(filePath, {
//   highWaterMark: 64 * 1024, //64 kb
// });

// stream.on("data", (chunk: Buffer) => {
//   chunkCount++;
//   console.log(`Chunk ${chunkCount} size: ${chunk.length / 1024} KB`);
// });

// stream.on("end", () => {
//   console.log("done.");
//   console.log(`Total chunks emitted: ${chunkCount}`);
// });

// stream.on("error", (err: NodeJS.ErrnoException) => {
//   if (err.code === "ENOENT") {
//     console.error("File not found.");
//   } else {
//     console.error("Stream error:", err.message);
//   }
// });

//D5
const filePath2 = resolve("./log.txt");
const stream_write = createWriteStream(filePath2, { flags: "w" });
let lineCount = 0;
const totalLines = 30;

function writeLines() {
  let ok = true;
  while (lineCount < totalLines && ok) {
    lineCount++;
    ok = stream_write.write(`Line ${lineCount}\n`);
  }

  if (lineCount < totalLines) {
    stream_write.once("drain", writeLines);
  } else {
    stream_write.on("finish", () => {
      console.log(`All ${totalLines} lines written to log.txt`);
    });
  }
}
stream_write.on("error", (err) => {
  console.error("Stream error:", err.message);
});
writeLines();

// Error handling
const binaryData = Buffer.from([0xde, 0xad, 0xbe, 0xef]);
stream_write.write(binaryData);
stream_write.end();

//D6 - Piping and transform

const s1 = resolve("./large.txt");

const d1 = resolve("./copied.txt");

const rs1 = createReadStream(s1);
const ws1 = createWriteStream(d1);

rs1.pipe(ws1);

ws1.on("finish", () => {
  console.log("File copied using streams.");
});

ws1.on("error", (err) => {
  console.error("Stream error:", err.message);
});

const d2 = resolve("./upper.txt");
console.time("transform-copy");

createReadStream(s1)
  .pipe(new UppercaseTransform())
  .pipe(createWriteStream(d2))
  .on("finish", () => {
    console.timeEnd("transform-copy");
    console.log("Uppercase transform completed.");
  });

//D7 - EventEmitters

const emitter = new EventEmitter();

function listenerOne(data: string) {
  console.log("Listener One Received\n", data);
}
function listenerTwo(data: string) {
  console.log("Listener Two received:", data);
}

emitter.on("greet", listenerOne); //register listender

emitter.emit("greet", "Hi there"); //trigger event

emitter.on("greet", listenerTwo);

emitter.emit("greet", "Second emit"); //both print in order they are written

emitter.off("greet", listenerTwo);

emitter.emit("greet", "Test second listener"); //one being used

emitter.once("greet", (msg) => {
  console.log("This runs only once:", msg);
});

//d8

const fp = resolve("src/drills/eyes.txt");

let debounceTimer: NodeJS.Timeout | null = null;

const watcher = watch(fp, (eventType, filename) => {
  if (!filename) return;

  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    if (eventType === "change") {
      console.log(`Modified ${filename}`);
    } else if (eventType === "rename") {
      console.log(`Rename or deleted ${filename}`);
    }
  }, 200);
});

setTimeout(() => {
  watcher.close();
  console.log("Stopped watching after 20 seconds.");
}, 20000);
