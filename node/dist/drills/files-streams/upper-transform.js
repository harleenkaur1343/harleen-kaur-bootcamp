import { Transform } from "node:stream";
export class UppercaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const upper = chunk.toString().toUpperCase();
        this.push(upper);
        callback();
    }
}
//# sourceMappingURL=upper-transform.js.map