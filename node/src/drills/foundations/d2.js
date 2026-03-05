import dotenv from "dotenv"

const result = dotenv.config();
console.log(result);
console.log("API KEY",process.env.API_KEY);
const port = process.env.PORT || 3000;
//|| - treats it as missing 
console.log(`The port is ${port}`);

//check if the variable is there else throw error 

function requireEnv(name){
  const envar = process.env[name];

  if(!envar){
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return envar;
}

console.log(`Check the variable presence ${requireEnv("PORT")}`);

//fail fast configuration  - app should fail at startup without some mandatory env vars - DB URL 
