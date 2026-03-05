import {pid,platform,version} from "node:process"

console.log(`This is the process id for node process ${pid} on ${platform}. Right now we are using the version ${version}`)

console.log(`The default args ${process.argv}`);

//user input through cli
console.log(`Slicing the paths ${process.argv.slice(2)}`); 

console.log("Curr directory", process.cwd());
console.log(`Env vars ${process.env.HOME}`);


