import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.openweathermap.org/data/2.5/weather", ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get("q");

    if (city === "London") {
      return HttpResponse.json({
        name: "London",
        main: { temp: 15.5 },
        weather: [{ description: "clear sky" }],
      });
    }

    if (city === "unauthorized") {
      return new HttpResponse(null, { status: 401 });
    }

    if (city === "server-error") {
      return new HttpResponse(null, { status: 500 });
    }

    if (city === "timeout") {
      return new HttpResponse(null, { status: 408 });
    }

    return new HttpResponse("NOT JSON {", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
