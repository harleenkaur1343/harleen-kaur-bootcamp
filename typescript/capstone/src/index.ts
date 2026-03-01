import {Command} from "commander";
import  { configCheck } from "./commands/configCheck"
import { usersAdd } from "./commands/usersAdd";
import { usersImport } from "./commands/usersImport";
import { usersList } from "./commands/usersList";
const program = new Command();

program 
 .command("config:check")
 .action(configCheck)

program
 .command("users:import <file>")
 .action(usersImport)
 //Commander reads it from the CLI and automatically gives it to your function.

 program
  .command("users:list")
  .action(usersList);

program
  .command("users:add")
  .requiredOption("--name <name>")
  .requiredOption("--email <email>")
  .action(usersAdd);

program.parse();