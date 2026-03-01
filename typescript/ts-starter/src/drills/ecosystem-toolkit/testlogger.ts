import {logger} from "./logger";

const user = {
  id:123
}
logger.info({user},"User id")
logger.warn("Test warn");
logger.error("Error here")
//pino - structured logging
//json like output 



//level
// 10 = trace
// 20 = debug
// 30 = info   ← this one
// 40 = warn
// 50 = error
// 60 = fatal

//timestamp - Unix timestamp in milliseconds of when the log was recorded

// {"level":30,"time":1772283539758,"pid":15973,"hostname":"harleen-VirtualBox","user":{"id":123},"msg":"User id"}
// {"level":40,"time":1772283539767,"pid":15973,"hostname":"harleen-VirtualBox","msg":"Test warn"}
// {"level":50,"time":1772283539768,"pid":15973,"hostname":"harleen-VirtualBox","msg":"Error here"}