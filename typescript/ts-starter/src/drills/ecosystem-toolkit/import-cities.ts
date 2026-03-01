import fs from "node:fs";
import { parse } from "csv-parse";
import { db } from "../../db";
import { logger } from "./logger";
import { cities } from "../../db/schema";


const parser = fs
  .createReadStream("cities.csv")
  .pipe(parse({ columns: true }));

for await (const row of parser) {
  try {
    await db.insert(cities).values(row);
    logger.info(`Inserted ${row.cityname}`);
  } catch(err) {
    console.log("SQL ERROR ",err);
    logger.error(`Failed for ${row.cityname}`);
  }
}

logger.info("Done");