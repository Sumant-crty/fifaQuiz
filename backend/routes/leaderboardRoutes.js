const express=require("express");

const router=express.Router();

const {
getLeaderboard,
saveScore
}=require(
"../controllers/leaderboardController"
);

router.get("/",getLeaderboard);

router.post("/",saveScore);

module.exports=router;