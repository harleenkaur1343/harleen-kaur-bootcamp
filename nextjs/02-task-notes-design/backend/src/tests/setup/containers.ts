//stop and start postgresql container 

import { PostgreSqlContainer } from "@testcontainers/postgresql";

let container : any;

export async function startContainer(){
  container = await new PostgreSqlContainer("postgres:15")
    .withDatabase("testdb")
    .withUsername("postgres")
    .withPassword("postgres")
    .start()

    process.env.DATABASE_URL = container.getConnectionUri();
    console.log("TEST DB URI ",process.env.DATABASE_URL)
    return container;
}

export async function stopContainer(){
  await container.stop();
}