import { query } from "../db/connection.js";

export async function checkDatabaseHealth(){
  const start = Date.now();

  try{
    await query("SELECT 1");

    const latency = Date.now() - start;
    return {
      status : "working",
      latency : `${latency}`
    };
  }catch(error){
    return {
      status: "unhealthy",
      error: (error as Error).message,
    };
  }
}