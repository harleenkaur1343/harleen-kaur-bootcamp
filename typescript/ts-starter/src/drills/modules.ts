import {add} from "./practice";
//import {subtract } from "@shared";
import {subtract} from "@shared/math"
//default
//import uuid from "@shared/uuid";
import { uuid } from "@shared";
//removes other exports which are not needed here
const res = add(2,3);
console.log(res);
console.log(uuid());
console.log(subtract(3,2));






