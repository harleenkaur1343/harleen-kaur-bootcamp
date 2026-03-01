// src/storage.ts
export interface Storage<T> {
  save(key: string, data: T): Promise<void>;
  load(key: string): Promise<T | null>;
  list(): Promise<string[]>;
}

export class FileStorage<T> implements Storage<T> {
  constructor(private basePath: string);
}
