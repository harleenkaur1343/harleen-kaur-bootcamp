//CLASSES - D1
// Implement class Counter with a private field and methods inc(), dec(), value().
// Add a constructor that accepts an initial value; make methods chainable by returning this.

// class Counter {
//   //fields are public by default
//   val:number = 1; //no let or const or var gives error
//   constructor(c?:number){
//     if(c!==undefined){
//       this.val = c;
//     }
//   }
//   //Constructors can’t have return type annotations - the class instance type is always what’s returned
//   //readonly fields cannot be reassigned a value even inside the class
//   //functions in classes are called methods
//   inc(){
//     this.val++;
//   }
//   dec(){
//     this.val--;
//   }
//   get isZero():boolean{
//     return this.val ===0;
//   }
//   // getVal(){
//   //   return this.val;
//   // }
// }
// const ct = new Counter();
// const ct2 = new Counter(4);
// // ct.val = 2; //error in case of readonly field
// console.log(ct.val);
// console.log(ct2.val);

// //--strictPropertyInitialization - controls if the fields need to be initialized in the constructor

// //ACCESS MODIFIERS
class User{
  public name: String; //accessible everywhere
  protected age: number; // can be accessed in class n subclasses
  private password: string; //within class - use getter and setters to modify

  constructor(n:string,a:number,pass:string){
    this.name = n;
    this.age = a;
    this.password = pass;
  }

}

const u1 = new User("Ishika",24,"secret");
console.log(u1.name); //public
//console.log(u1.age)

class Admin extends User{
constructor(name:string, age:number, password:string){
  super(name,age,password)
}

}
const adm1 = new Admin ("A", 30, "pass")

//PRIVATE AND #PRIVATE
class BankAccount {
   private balance: number;
  constructor(balance: number) {
    this.balance = balance;
  }

  showBalance(){
    console.log(this.balance);
  }
}

const acc = new BankAccount(1999);
//console.log("Balance : " + acc.balance);
acc.showBalance();

// //Private and #private
class Test {
  private x = 10;
  #test = "blue";
}
//console.log("Private x : " + new Test().x);
//console.log(new Test().#x)
//TS error but JS runs - private specifier accessible from runtime
// console.log(new Test().#test); //runtime error

//GETTERS AND SETTERS
//getter is accessed like a property

class Counts {
  #count = 0;
  #_step = 1;

  increment(){
    this.#count ++;
  }

  get isZero():boolean{
    return this.#count === 0;
  }

  set step (n:number){
    //does not return anything
    if(n < 0) {
      throw new Error ("Step cannot be negative");
    }
    this.#_step = n;
  }

  get value(){
    return this.#count;
  }

  reset(){
    this.#count = 0;
  }

}
const testcount = new Counts();
testcount.increment();
testcount.step = 5;

console.log(testcount.isZero);
console.log(testcount.value);

//STATIC MEMBERS

class MyClass{
  //Classes may have static members
  //not associated with the instances but accessed through class
  count : number;
  static x = 0 ;
  static printX (){
    console.log(MyClass.x);
  }
  constructor(n:number){
    this.count = n;
   MyClass.x++; //can count number of objects created
  }
  static fromJSON(json:string) : MyClass{
    //return a MyClass object
    const data = JSON.parse(json);
    return new MyClass(data.num);
  }
}

const ob1 = new MyClass(2);
const ob2 = new MyClass(4);
MyClass.printX();

const ob3 = MyClass.fromJSON('{"num":5}');
console.log(ob3.count);

class Counter {
  protected count;

  constructor(initial: number = 0) {
    // if(initial!==undefined)
    this.count = initial;
  }

  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
  get value() {
    return this.count;
  }
}
//INHERITENCE
class BoundedCounter extends Counter {
  protected max;
  constructor(initial = 0, max: number) {
    super(initial);
    this.max = max;
  }
  override increment() {
    if (this.count < this.max) this.count++;
    else throw new Error("Limit will be exceeded");
  }
  override decrement() {
    if (this.count > 0) this.count--;
    else throw new Error("Cannot decrement below 0");
  }
}

//COMPOSITION 
class BoundCounter {
  #inner:Counter;
  #max : number
  constructor(
     inner: Counter,
     max: number,
  ) {this.#max = max; this.#inner = inner}

  increment() {
    if (this.#inner.value < this.#max) {
      this.#inner.increment();
    } else {
      throw new Error("Max limit reached");
    }
  }
  decrement() {
    if (this.#inner.value > 0) {
      this.#inner.decrement();
    } else {
      throw new Error("Cannot decrease below 0");
    }
  }

  get value() {
    return this.#inner.value;
  }
}

const c1= new BoundCounter(new Counter(),5);
for(let i=0; i<5; i++){
  c1.increment();
}
//c1.increment(); - max limit reached here 
console.log(c1.value);
//console.log("COMPOSITION : " + c1.inner.value);

//ABSTRACT CLASS
abstract class Store<T> {
  //shared data 
  protected cache = new Map<string,number>();
  private isOpen = false;

  open(){
    this.isOpen = true;
  }
  close(){
    this.isOpen= false;
  }
  protected requireOpen(){
    if(!this.isOpen){
      throw new Error("Store is closed")
    }
  }
  abstract get (key:string): T | undefined;
 abstract set (key:string,value:T) : void;
 abstract has (key:string) : boolean
}

class MemoryStore<T> extends Store<T>{
    #data = new Map<string,T>()

    set(k:string, value:T): void{
      this.requireOpen();
      this.#data.set(k,value)
    }
    get(k:string): T|undefined{
      this.requireOpen();
      
      return this.#data.get(k);
    }
    has(k:string):boolean{
      this.requireOpen();
      return this.#data.has(k);
    }
}

const store1 = new MemoryStore<number>();
store1.open();
store1.set("maths",100);
store1.set("english",89);

console.log("Marks in maths: " + store1.get("maths"));
store1.close();


//Invariant is a rule that must always be true 
//enforced in abstract class to avoid repetition