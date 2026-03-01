import { error, info, warn } from "node:console";
import { string } from "zod";

export class Logger{
  constructor(private level:LogLevel){

    info(message:string, context?:object):void;
    warn(message:string, context?:object):void;
    error(message:string,context?:object):void;
  }
}