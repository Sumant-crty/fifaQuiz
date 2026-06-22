const mongoose=require("mongoose");
const dotenv=require("dotenv");

const Question=
require("../models/Question");

dotenv.config();

mongoose.connect(
process.env.MONGO_URI
);

const data=[

{
year:1998,
difficulty:"easy",
question:
"Who won FIFA World Cup 1998?",
options:[
"France",
"Brazil",
"Germany",
"Italy"
],
answer:"France",
explanation:
"France defeated Brazil 3-0."
},

{
year:2002,
difficulty:"easy",
question:
"Who won FIFA World Cup 2002?",
options:[
"Brazil",
"Germany",
"France",
"Italy"
],
answer:"Brazil",
explanation:
"Brazil defeated Germany 2-0."
},

{
year:2006,
difficulty:"easy",
question:
"Who won FIFA World Cup 2006?",
options:[
"Italy",
"France",
"Germany",
"Brazil"
],
answer:"Italy",
explanation:
"Italy won on penalties."
}

];

async function seed(){

await Question.deleteMany();

await Question.insertMany(data);

console.log("Seed Complete");

process.exit();

}

seed();