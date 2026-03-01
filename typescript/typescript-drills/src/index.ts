import { string, uuid } from "zod";
//import "./drills/practice.ts";
// import "./drills/oops.ts"
// import "./drills/generics.ts"
//import "./drills/advanced-types.ts"
// import "./drills/async-promises.ts"
//import "./drills/modules.ts";
//import "./drills/ecosystem-toolkit/fs-extra"
import "./drills/ecosystem-toolkit/yamlcheck"
import dayjs from "dayjs";

const now = dayjs();
const formatted = now.format("YYYY-MM-DD");
console.log(formatted);

 console.log(process.cwd());
