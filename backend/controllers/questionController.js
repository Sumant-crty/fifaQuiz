const Question=require("../models/questions");

exports.getQuestions=async(req,res)=>{

try{

const year=req.query.year;
const random=req.query.random;
const limit=parseInt(req.query.limit)||0;

let questions;

if(random){
  const matchStage=year?{$match:{year:parseInt(year)}}:{$match:{}};
  questions=await Question.aggregate([
    matchStage,
    {$sample:{size:limit||20}}
  ]);
}else{
  let query={};
  if(year) query.year=parseInt(year);
  questions=await Question.find(query).limit(limit||0);
}

res.json(questions);

}catch(err){

res.status(500).json({
message:err.message
});

}

};

exports.createQuestion=
async(req,res)=>{

try{

const question=
await Question.create(req.body);

res.status(201).json(question);

}catch(err){

res.status(500).json({
message:err.message
});

}

};

exports.updateQuestion=
async(req,res)=>{

try{

const updated=
await Question.findByIdAndUpdate(
req.params.id,
req.body,
{
new:true
}
);

res.json(updated);

}catch(err){

res.status(500).json({
message:err.message
});

}

};

exports.deleteQuestion=
async(req,res)=>{

try{

await Question.findByIdAndDelete(
req.params.id
);

res.json({
message:"Deleted"
});

}catch(err){

res.status(500).json({
message:err.message
});

}

};