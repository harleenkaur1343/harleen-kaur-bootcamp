import { Task } from "@/types/task";
import { Login, Register } from "../types/user";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api";

export interface ApiError extends Error {
  status?: number;
}
//FYI
// export interface RequestInit {
//   method?: string
//   keepalive?: boolean
//   headers?: HeadersInit
//   body?: BodyInit | null
//   redirect?: RequestRedirect
//   integrity?: string
//   signal?: AbortSignal | null
//   credentials?: RequestCredentials
//   mode?: RequestMode
//   referrer?: string
//   referrerPolicy?: ReferrerPolicy
//   window?: null
//   dispatcher?: Dispatcher
//   duplex?: RequestDuplex
// }

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
      credentials: "include",
    });

    if (!response.ok) {
      //adding status i.e number

      console.log("Get tasks err", response.json());
      const error = new Error(`API Error ${response.statusText}`) as ApiError;
      error.status = response.status;
      throw error;
    }
    const data = await response.json()
    console.log("THE GLOBAL RESPONSE", data);
    return data;
  } catch (error) {
    console.error("API Request failed:", error);
    throw error;
  }
}

export const api = {
  login: (info: Login) => {
    const res = apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(info),
    });
    return res;
  },
  register: (info: Register) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(info),
    });
  },
};
