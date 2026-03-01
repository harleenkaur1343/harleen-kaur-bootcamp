// src/utils.ts
export function groupBy<T, K extends keyof T>(
  items: T[],
  key: K
): Record<string, T[]>;