//D1 
//Generics allow us to write code which can work with many types 
function identity<T>(x:T): T | undefined{
  console.log("In generic identity : " + x +" : " + typeof x);
  return x;
}

function ident(x:unknown){
  console.log("In any identity : " + x +" : " + typeof x);
  return x;
}

//inferred
identity(34);
const res = identity("Dam");
res?.toUpperCase();
identity([1,2,4])
//explicit 
identity<string>("hello")


//D2
function testGenArr<T>(x:T[]):T|undefined{
  return x[0];
}

console.log(testGenArr([1,2,3]));
console.log(testGenArr([{"name":"Arush"},{"name":"Pooja"}]));
console.log(testGenArr([1,"1"])); //T here is inferred as string | number

//D3 - Constraints - what T is allowed to be 
//allowing only DataTypes which have a length 

function testGenArrWithLen<T extends {length:number}>(x:T[]):number | undefined{
  return x[0]?.length;
}

console.log(testGenArrWithLen(["23","4","6"])); //string has length 
console.log(testGenArrWithLen([[2,3,5],[4]]));
//console.log(testGenArrWithLen([1,4])); //number has no length 

//multiple contraints using interface 
interface HasId{
  id:number
}
type HasName = {
  name:string
}
function genericsConstMul<T extends HasId & HasName>(x:T[]):number | undefined{
  return x[0]?.id;
}
console.log(genericsConstMul([{id:101,name:"Aman"},{id:102, name:"Hardik", rollNo:33}]));


//D4 - DEFAULT PARAMETERS
type ApiResponse<T = unknown> = {status: number; data: T}
//T can be object/string/number 
//if user does not provide a type it will become unknown 

const response1 : ApiResponse<string> = {
  status: 404,
  data: "not-found"
}

const res2 : ApiResponse = {
  status: 200,
  data : "OK"
}
//console.log(res2.data.toLowerCase()); //type is unknown

const res3 : ApiResponse<{msg : string}> = {
  status: 200,
  data : {msg:"OK"}
}
console.log(res3.data.msg.concat(" Fine"));


//D5 - Keyof and Lookup Types 



