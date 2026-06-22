const Score=require("../models/Score");

exports.getLeaderboard=
async(req,res)=>{

try{

const scores=
await Score.find()
.sort({score:-1})
.limit(20);

res.json(scores);

}catch(err){

res.status(500).json({
message:err.message
});

}

};

exports.saveScore=
async(req,res)=>{

try{

const score=
await Score.create(req.body);

res.status(201).json(score);

}catch(err){

res.status(500).json({
message:err.message
});

}

};