import { db } from "../../db";
import {users} from "../../db/schema";

async function createUsers(){
  await db.insert(users).values([
    {name:"Harleen", email:"harleen123@gmail.com"},
    {name:"Aditi", email:"aditi123@gmail.com"}
  ])

  //fetch 
  const allUsers = await db.select().from(users);
  console.log(allUsers);
}

createUsers();