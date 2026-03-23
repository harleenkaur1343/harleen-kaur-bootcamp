let a = "some text";
console.log(a);

window.addEventListener("load", async () => {
  console.log("Page loaded, fetching /api/time...");

  try {
    const response = await fetch("/api/time");
    // const response = await fetch("https://api.invalid.local/ping")
    const data = await response.json();
   
    console.log("API Response:", data);
  } catch (error) {
    console.error("API call failed:", error);
  }
   throw new Error('boot failed');
});
