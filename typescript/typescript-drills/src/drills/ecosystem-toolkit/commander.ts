import {Command} from 'commander';
const program = new Command();

// program
//  .name("mycli") //CLI tool name mycli --help
//  .description("My first CLI") //- mycli --help
//  .version("1.0.0") // mycli --version

// program 
// //sub command
//  .command("greet")
//  .description("Greet a user")
//  //arg to be passed with greet <> - required [] - optional 
//  .argument("<name>")
//  // optonal flag 
//  .option("-t, --title <title>", "title")
//   .action((name, options) => {
//     console.log(`Hello ${options.title ?? ""} ${name}`);
//   });
//   //mycli greet <name> [options]
//  program.parse(); //reads input from process.argv

program
 .name("mycli")
 .version("1.0.0")

program
 .command("greet")
 .argument("<name>","name of the person")
 .option("-u, --uppercase","converts the name to uppercase")
 .option("-t --times <n>", "number of times the greeting needs to be printed","1")
 .action((name:string,options:{uppercase?:boolean; times:string})=>{
    const times = Number(options.times);
    let message = `Hi ${name}`;

    if(options.uppercase){
      message = message.toUpperCase();
    }

    for(let i=0; i<times; i++){
      console.log(message)
    }
 })
program.parse();