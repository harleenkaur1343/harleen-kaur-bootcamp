//Promise represents the result of an asyncronous operation
//Object represents a value which will be available later
//Non blocking of code ensured when getting API response, timers

// import { rejects } from "node:assert";
// import { count } from "node:console";
// import { resolve } from "node:dns";

//States - Pending, Fulfilled, Rejected

//Pending - food is being cooked
//Fullfilled - Food delivered
//Rejected - order cancelled - due to some issues

//promise can be resolved only once

const num: Promise<number> = new Promise((resolve) => {
  resolve(42);
});
console.log(num);
//
// Promise {<fulfilled>: 11}
// [[Prototype]] : Promise
// [[PromiseState]] : "fulfilled"
// [[PromiseResult]]  :  11

//D2
export async function add(a: number, b: number): Promise<number> {
  return a + b;
}
//async wraps return value in a Promise
const ans = await add(3, 4);
//await unwraps a promise and returns the resolved/rejected value
console.log("Promise ans : " + add(1, 2));
console.log("Await ans ", ans);

//callback to promise here

//D3 - SEQ VS PARALLEL
type User = {
  id: string;
  name: string;
};

async function fetchUser(id: string): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "Rashi" });
    }, 2000);
  });
}

async function fetchUserMaybe(id: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === "3") {
        reject(new Error("Promise rejected for this id")); //no need to return user {} on reject
      } else resolve({ id, name: "Arush" });
    }, 1000);
  });
}

async function callAsync() {
  //PARALLEL
  const res = await Promise.all([
    //array of promises - returned promise is rejected only if One is rejected
    fetchUser("4"),
    fetchUser("3"),
  ]);

  console.log("Parallel execution of promises : ", res);

  const user1 = await fetchUser("1");
  //wait for 5 sec
  const user2 = await fetchUser("2");
  //wait for 5 sec
  //total wait = 10 sec
  console.log("Sequential calls : ", user1);
  console.log("Sequential calls : ", user2);

  //returned promise is does not get rejected because of one - returns both with the status and data
  const res2 = await Promise.allSettled([fetchUserMaybe("4"), fetchUserMaybe("3")]);
  //extract only successful ones
  //const allusers: User[] = res2.filter((r) => r.status === "fulfilled").map((r) => r.value);
  console.log("All Settled promise ", res2);
  //console.log("All fulfilled promises ; ", allusers);
}

// callAsync();

//D4 - TIMEOUT -
// wait for a specific time for a promise result
//if not result - treat it as failure

//useful in db queries, network calls, file I/O, API calls
//prevents app freezes, resouces exhaution

async function timeout<T>(p: Promise<T>, ms: number): Promise<T> {
  //returning the promise of type T
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timed out after ${ms} milliseconds`));
    }, ms);

    p.then((val) => {
      clearTimeout(timer);
      resolve(val);
    }).catch((err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

//const timeoutres = await timeout(fetchUser("6"),5000);

// console.log("Timeout result" + timeoutres);

//the slow promise
function slow(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Slow func finished");
    }, 2000);
  });
}

async function shortTimeout() {
  try {
    const res = await timeout(slow(), 4000);
    console.log(res);
  } catch (err) {
    console.log("Short timeout err ", err);
  }
}
shortTimeout();

//D5 RETRIES AND BACKOFF
//temp failures - network timeout, rate limit - can be resolved after sending request after sometime

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
  //just return a resolved promise after ms MS
}

type RetryableError = Error & { retryable?: boolean };

async function retry<T>(fn: () => Promise<T>, attempts = 2, backoffMs = 250): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i <= attempts; i++) {
    try {
      console.log("retry ", i + 1);
      return await fn(); //called the function with the promise
    } catch (err) {
      lastError = err;

      //now check the error if it is retyable
      //(err as RetryableError).retryable === true — casts err to RetryableError
      // so TypeScript allows us to access .retryable, then checks if it's explicitly true

      const isRetryable =
        typeof err === "object" && err !== null && (err as RetryableError).retryable === true;

      if (!isRetryable || i === attempts) {
        throw err; //if not retryable or attempts exhausted
      }

      const delay = backoffMs * 2 ** i; //eponential backoff;
      await sleep(delay);
    }
  }
  throw lastError; //if all retries exhaust
}

//mock failed call
async function fetchRandom(): Promise<string> {
  await sleep(300);
  if (Math.random() < 0.7) {
    const err: any = new Error("Temporary failure");
    err.retryable = true;
    throw err;
  }
  return "User fetched";
}

const result = await retry(fetchRandom,3,500)
console.log("Retries result " + result);

//D6 - Cancellation with AbortController¶
//In above example we stopped listening but the promise was not cancelled
//to ensure that the promise is stopped we use abortController

//controller.abort() - send cancel signal
//signal - something async fucntions listen to

function withTimeoutSignal(ms: number) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, ms);

  return {
    controller,
    signal: controller.signal,
    timer,
  };
}

//mock fetch
async function mockFetch(url: string, opts?: { signal: AbortSignal }): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve(`Fetched the url ${url}`);
    }, 2000);

    opts?.signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Aborted"));
    });
  });
}

const { signal } = withTimeoutSignal(6000);

try {
  const res = await mockFetch("user/api", { signal });
  console.log(`Abort ${res}`);
} catch (err) {
  console.log("Request cancelled");
}

//D7 - Concurrency Limits
//implemented using semaphore which decides how many task are allowed to run concurrently

class Semaphore {
  #permits: number;
  //array of functions which are not returning anything, initalized by []
  #queue: (() => void)[] = [];

  constructor(count: number) {
    this.#permits = count;
  }

  async acquire() {
    if (this.#permits > 0) {
      this.#permits--;
      return;
    }
    //add to queue if permits are finished
    await new Promise<void>((resolve) => {
      this.#queue.push(resolve);
    });
  }
  release() {
    this.#permits++;

    const next = this.#queue.shift();
    //removed first elements from the array - we get resolve func

    if (next) {
      
      this.#permits--;
      next();
    }
  }
}

async function runWithLimit<T>(count: number, tasks: (() => Promise<T>)[]): Promise<T[]> {
  const sem = new Semaphore(count); //number of tasks allowed to run at only
  const results: T[] = [];

  await Promise.all(
    tasks.map(async (task, index) => {
      await sem.acquire();

      try {
        const value = await task();
        results[index] = value;
        //why start 1 and 2 altogether
        console.log("Results arr ", results);
      } finally {
        sem.release();
      }
    }),
  );
  return results;
}

let running = 0;

function createTask(id: number, delay: number) {
  return async () => {
    running++;
    console.log(`Start ${id} | running = ${running}`);

    await new Promise((res) => setTimeout(res, delay));

    console.log(`End   ${id}`);
    running--;

    return id;
  };
}
const tasks = [
  createTask(1, 1000),
  createTask(2, 1000),
  createTask(3, 1000),
  createTask(4, 1000),
  createTask(5, 1000),
];

await runWithLimit(2, tasks);

//D8 - Error handling
type Result<T> = { ok: true; value: T } | { ok: false; error: string };
async function catchErr(count: number) {
  try {
    const seeres = await new Promise((resolve, reject) => {
      if (count === 2) {
        reject(new Error("Not accepted"));
      } else {
        setTimeout(() => resolve({ ok: true, value: "Sorted" }), 1000);
      }
    });
  } catch (err) {
    return { ok: false, error: "Not for this Id" };
  }
}
const resultts: any = await catchErr(2);
console.log("TRY CATCH ERR D8 ", resultts.ok ? resultts.value : resultts.error);

//If the caller is expected to handle the failure → use Result (for form validation)
//If not → throw - db errors

//D9 - FIRE AND FORGET
// start and async function without awaitigng it for the result
// for sending data, runs in background, - not concerned abiut the resposne

//risk - unhandled rejection - use catch

async function mockEmail(userId: string) {
  await new Promise((res) => setTimeout(res, 1000));
  throw new Error("SMTP failed");
}

function handler() {
  mockEmail("u1").catch((err) => {
    //@typescript-eslint/no-floating-promises - for promises w/o await, return catch
    console.log(`Fire n forget err ${err}`);
  });

  console.log("email sent ");
}

handler();


//D-10  Typing Async APIs 
interface Users {
  id:number;
  name: string;
}

async function getUser() :Promise<Users>{
  return {id:12, name:"Hari"}
}

const getuser = await getUser()
console.log(getuser);

interface APIResponse<T> {
  status:number;
  data:T
}

async function fetchingUser ( ) : Promise<APIResponse<Users>>{
    return {
      status:200,
      data: {
        id:34,
        name:"Rishi"
      }
    }
}

console.log(await fetchingUser());

// export {};
