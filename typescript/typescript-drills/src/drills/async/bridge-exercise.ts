//retry
//limit = 3
//delay - backoff default
//

// A helper to wait for a given time
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// A mock operation that might fail
let shouldFail = true;
async function mightFail(): Promise<string> {
  if (shouldFail) {
    shouldFail = false; // It will succeed on the second try
    throw new Error("Operation failed!");
  }
  return "Success!";
}

async function retry<T>(operation: () => Promise<T>, attempts: number): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i < attempts - 1) {
        console.log(`Attempt ${i + 1} failed. Retrying in 100ms...`);
        await sleep(100);
      } else {
        throw error;
      }
      throw new Error("Should not be reached");
    }
  }
}

retry(mightFail, 3).then((result) => console.log(result)).catch((error) => console.error("All retries failed:", error));
