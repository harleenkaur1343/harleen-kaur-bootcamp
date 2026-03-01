//D1 - UNION TYPES
type Status = "success" | "loading" | "error";

function handle(status: Status) {
  switch (status) {
    case "loading":
      return "Hang in there, loading some goodness for you";
    case "success":
      return "Looks like you are set to get and order";
    case "error":
      return "Oops! we have encountered and error";
    default: {
      const notExpected: never = status;
      return notExpected;
    }
  }
}

console.log(handle("loading"));
//console.log(handle("Return"));

//D2 - INTERSECTION TYPES
type HasId = {
  id: string;
};

type HasTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};
type Entity = HasId & HasTimestamps;

const user1: Entity = {
  id: "u1",
  createdAt: new Date(),
  updatedAt: new Date(),
};
//D3 - DISCRIMINATED UNIONS
//Discriminated unions is union of object types with a literal property

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; breadth: number; length: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return shape.radius * shape.radius * 3.14;
    case "square":
      return shape.side * shape.side;
    case "rectangle":
      return shape.length * shape.breadth;
    default: {
      const notExpected : never= shape;
      return notExpected;
    }
  }
}

//D4 - TYPE GUARDS
function isCircle(s:Shape):s is {kind:"circle"; radius : number}{
  return s.kind === "circle"
}

console.log(isCircle({kind:"circle", radius:7}));

function area(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  }

  if (shape.kind === "square") {
    return shape.side ** 2;
  }

  return shape.breadth * shape.length;
}
// Without type guard

// Filter = runtime only
// TypeScript: "Still Shape[]"

// With type guard
// Filter = runtime + type change
// TypeScript: "Now Circle[]"

//Narrowing using In (used to check the property existence)


function areaReturns(s:Shape):number{
    if("radius" in s){
      return Math.PI*s.radius**2;
    }else if ("side" in s){
      return s.side**2;
    }
    else{
      return s.breadth*s.length;
    }
}
console.log("Area of square : " + areaReturns({kind:"square", side:2}));


//D5 - CONDITIONAL TYPES 
type PromiseType<T> = T extends Promise<infer U>? U : T;
//if the value passeed in T is of type Promise<something> then infer what something type is else return T

type stringProm = PromiseType<Promise<string>>;
//returns string
type numberType = PromiseType<number>
//returns number not of promise type

type Nullable<T> = T | null;
type theString = Nullable<string>;
//return type = string | null;

type Non_Nullable<T> = T extends null | undefined? never : T;
//TS returns never null/undefined is passed else retunr T

type testNull = Non_Nullable<null>
type test = Non_Nullable<string | null | undefined>
//returns string | never | never = string (types are distributive over unions ) 
//const a : testNull = "str"

//D6 - MORE UTILITY TYPES 
type UserType = {
  name:string;
  id:number;
  age?:number;
}
type normaluser = UserType;
type req = Required<UserType>; //optional age is now required 
type onlyRead = Readonly<UserType>;

//Extract - Keep the matching ones - filter  
//Exclude - Remove matching 
type result = Exclude<"a" | "b" | "c", "a"> // - gives "b and "c
type response = "404" | "200" | "500";
type notFound =  Extract<response,"404">;


//D7 - TEMPLATE LITERAL TYPES 
type Events = "click" | "hover" | "focus";
type eventHandlerNames = `on${Capitalize<Events>}`; 
//more are - Uppercase<>, Lowercase<>, Uncapitalize<>

//D8 - Indexed Access
type NestedUserData = {
  id: {
    name: string,
    address: {
      city:string,
      state:string,
      pincode:number
    }
  }
}
type pincode = NestedUserData["id"]["address"]["pincode"]

//accept all jsons 
//recursive because type refers to itself - infinte nesting
//typing API responses, configs 
type JsonValue = string | boolean | number | null | JsonValue[] | {[key:string]:JsonValue}