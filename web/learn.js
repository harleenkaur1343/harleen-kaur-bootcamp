let a = "some text";
console.log(a);

window.addEventListener("load", async () => {
  console.log("Page loaded, fetching /api/time...");

  try {
    const response = await fetch("/api/time");
    const data = await response.json();
    console.log("API Response:", data);
  } catch (error) {
    console.error("API call failed:", error);
  }
});
