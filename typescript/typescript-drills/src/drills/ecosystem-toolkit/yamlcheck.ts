import YAML from "yaml";
import fs from "fs-extra";

const obj = YAML.parse("name:world\n");
//YAML.parse - converts to JS Object {name:"world"}
const text = YAML.stringify({ hello: "world" });

//no brackets 
//comments allowed
//multi line strings 


//drill 

const INPUT = "somedata.yaml";
const OUTPUT_JSON = "data.json";
const YAML_OUT = "yamlagain.yaml";

//async 
async function execute(){
  //fetch the yaml contents 
  const yamlContent = await fs.readFile(INPUT);
  const obj = YAML.parse(yamlContent);
  await fs.writeJSON(OUTPUT_JSON,obj,{spaces:2});
  const jsonObj = await fs.readJSON(OUTPUT_JSON);
  const newYaml = YAML.stringify(jsonObj);
   await fs.writeFile(YAML_OUT, newYaml);
  const same = JSON.stringify(obj) === JSON.stringify(jsonObj);

  console.log("verified:", same);

}
execute();

