//D1

import { number } from "zod";

//Generics allow us to write code which can work with many types
function identity<T>(x: T): T | undefined {
  console.log("In generic identity : " + x + " : " + typeof x);
  return x;
}

function ident(x: unknown) {
  console.log("In any identity : " + x + " : " + typeof x);
  return x;
}

//inferred
identity(34);
const res = identity("Dam");
res?.toUpperCase();
identity([1, 2, 4]);
//explicit
identity<string>("hello");

//D2
function testGenArr<T>(x: T[]): T | undefined {
  return x[0];
}

console.log(testGenArr([1, 2, 3]));
console.log(testGenArr([{ name: "Arush" }, { name: "Pooja" }]));
console.log(testGenArr([1, "1"])); //T here is inferred as string | number

//D3 - Constraints - what T is allowed to be
//allowing only DataTypes which have a length

function testGenArrWithLen<T extends { length: number }>(x: T[]): number | undefined {
  return x[0]?.length;
}

console.log(testGenArrWithLen(["23", "4", "6"])); //string has length
console.log(testGenArrWithLen([[2, 3, 5], [4]]));
//console.log(testGenArrWithLen([1,4])); //number has no length

//multiple contraints using interface
interface HasId {
  id: number;
}
type HasName = {
  name: string;
};
function genericsConstMul<T extends HasId & HasName>(x: T[]): number | undefined {
  return x[0]?.id;
}
console.log(
  genericsConstMul([
    { id: 101, name: "Aman" },
    { id: 102, name: "Hardik", rollNo: 33 },
  ]),
);

//D4 - DEFAULT PARAMETERS
type ApiResponse<T = unknown> = { status: number; data: T };
//T can be object/string/number
//if user does not provide a type it will become unknown

const response1: ApiResponse<string> = {
  status: 404,
  data: "not-found",
};

const res2: ApiResponse = {
  status: 200,
  data: "OK",
};
//console.log(res2.data.toLowerCase()); //type is unknown

const res3: ApiResponse<{ msg: string }> = {
  status: 200,
  data: { msg: "OK" },
};
console.log(res3.data.msg.concat(" Fine"));

//D5 - Keyof and Lookup Types
type Keys<T> = keyof T;
//Keys contain all the keya as union of The Type T

interface Product {
  id: number;
  name: string;
  qty: number;
  price?: number;
}
type allProdKeys = Keys<Product>;
//collection of all keys of Product
const prods: Record<allProdKeys, number | string> = {
  id: 102,
  name: "Sunscreen",
  qty: 33,
  price: 150,
};

//LOOKUP
// Extract a type from another type using a key
//T[K] - what is the type of property K inside the Type T - Type of the Value at Key K

interface Users {
  id: string;
  age: number;
}
type IdType = Users["id"]; //string
const str: IdType = "startle";

// console.log(typeof str);
// without lookup types - generics

//T - obj of type, K extends keyof T
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user1 = {
  id: "U1",
  age: 25,
};

const a = getProp(user1, "age"); //2nd argument should be one of the keys of first and
console.log("Type of Id, " + a);
//console.log(getProp(user1,"ggf"))

type Tuple = [string, number, boolean];
type firstEl = Tuple[0]; //- T[K];

//extracting API response
interface APIResponse {
  status: Number;
  data: {
    user: {
      id: number;
      name: string;
    };
  };
}

type UserType = APIResponse["data"]["user"];

//create objects based on it

//D6 - Mapped Types
//Modify a type blueprint by looping over keys using
//Readonly - name of type
// of type T
//which stores objects
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Partial<T> = { [K in keyof T]?: T[K] };
//K in keyof T - loops over each key and
type readOnlyUsers = Readonly<Users>;
type optKeysUsers = Partial<Users>;
const user2: readOnlyUsers = {
  id: "404",
  age: 23,
};

const user3: optKeysUsers = {
  id: "34", //no error on not adding age
};

//user2.id = "546"; gives error that it cannot be modified

//D7 - Conditional Types
// if T is assignable to string return true else false
type isNumber<T> = T extends number ? true : false;

type check = isNumber<number>;
//const c :check = 2;

//Infering type based on array type
type ElementType<T> = T extends (infer U)[] ? U : T;
// if T is of type array then capture its inner type (what type of elements it has) as U, if not return T type

type arrInnerType = ElementType<boolean>;

//D8 - Utility Types
//Using Record
const users1: Record<string, Users> = {
  u1: {
    id: "1234",
    age: 34,
  },
  u2: {
    id: "345",
    age: 35,
  },
};
const users2: Record<string, Pick<Users, "id">> = {
  u1: {
    id: "1234",
    //age:34 only id is allowed
  },
};
const users3: Record<string, Omit<Users, "id">> = {
  u1: {
    // id:"1234", id is omitted
    age: 34,
  },
};

//Using with generic functions
function pluck<T, K extends keyof T>(objs: T[], key: K): T[K][] {
  return objs.map((obj) => obj[key]); //not a 2d array but returns array of the values of the particular keyy
}
type CollectionUsers = {
    id: number;
    name: string;
  }[];
const usersColl: CollectionUsers = [
  { id: 234, name: "Diya" },
  { id: 345, name: "Jiya" },
];
console.log(pluck(usersColl, "id"));


//exercise 
function wrapInObject<T>(value:T) : {data : T} {
    return {data : value};
}

console.log(wrapInObject("two"));
console.log(wrapInObject({id:1}));