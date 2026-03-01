//parse csv
//validate against schema
//insert in db
//summ in lowdb

import { createReadStream } from "fs";
import { parse } from "csv-parse";
//csv to js objects
import { z } from "zod";
//runtime validation
import { users } from "../db/schema.js";
import { createDb } from "../db/client.js";
//connection
import { getImportLog } from "../importLog.js";
//run history
import { loadConfig } from "../config.js";
import { createLogger } from "../logger.js";
import dayjs from "dayjs";
//timestamp

// Validate each CSV row
const RowSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
});

export async function usersImport(filePath: string) {
  const config = loadConfig();
  const logger = createLogger(config.logLevel);
  const db = createDb(config.dbPath);

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  const records: unknown[] = await new Promise((resolve, reject) => {
    const rows: unknown[] = [];
    //stream - Processes chunk by chunk
    //readFile - loads entire file in RAM
    createReadStream(filePath)
      .pipe(parse({ columns: true, trim: true }))
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });

  for (const record of records) {
    //check against the rowschema
    const result = RowSchema.safeParse(record);

    if (!result.success) {
      logger.error({ error: result.error.flatten() }, "Invalid row skipped");
      errors++;
      continue;
    }

    try {
      await db.insert(users).values(result.data);
      logger.debug({ email: result.data.email }, "Inserted user");
      inserted++;
    } catch (err: any) {
      if (err?.code === "SQLITE_CONSTRAINT_UNIQUE") {
        logger.debug({ email: result.data.email }, "Duplicate skipped");
        skipped++;
      } else {
        logger.error({ err }, "Unexpected DB error");
        errors++;
      }
    }
  }

  // 3. Save run summary to lowdb
  const logDb = await getImportLog();
  logDb.data.runs.push({
    timestamp: dayjs().toISOString(),
    file: filePath,
    inserted,
    skipped,
    errors,
  });
  await logDb.write();

  console.log(
    `Import complete — inserted: ${inserted}, skipped: ${skipped}, errors: ${errors}`,
  );
}
