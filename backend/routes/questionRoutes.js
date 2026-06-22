const express=require("express");

const router=express.Router();

const {
getQuestions,
createQuestion,
updateQuestion,
deleteQuestion
}=require(
"../controllers/questionController"
);

const auth=
require("../middleware/authMiddleware");

const admin=
require("../middleware/adminMiddleware");

router.get("/",getQuestions);

router.post(
"/",
auth,
admin,
createQuestion
);

router.put(
"/:id",
auth,
admin,
updateQuestion
);

router.delete(
"/:id",
auth,
admin,
deleteQuestion
);

module.exports=router;