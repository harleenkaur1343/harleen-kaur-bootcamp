import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type RunSummary = {
  timestamp: string;
  file: string;
  inserted: number;
  skipped: number;
  errors: number;
};

type DbData = { runs: RunSummary[] };

export async function getImportLog(path = "import-log.json") {
  const adapter = new JSONFile<DbData>(path);
  const db = new Low(adapter, { runs: [] });
  await db.read();
  return db;
}