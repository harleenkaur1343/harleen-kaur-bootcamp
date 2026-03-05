import { Transform, TransformCallback } from "node:stream";

export class UppercaseTransform extends Transform {
  _transform(chunk: Buffer, encoding: BufferEncoding, callback: Function ) {
      const upper = chunk.toString().toUpperCase();
      this.push(upper);
      callback();
  }
}

