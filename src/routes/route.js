const express=require("express")
const router=express.Router()
const collegeCont = require("../controllers/collegeController")
const internCont = require("../controllers/createIntern")
router.get("/demo/:name",function(req,res){
    const a=req.params.name
    console.log(a)
    res.send("done")
})
router.post("/functionup/colleges", collegeCont.createCollege);
router.post("/functionup/interns", internCont.createIntern)
router.get("/functionup/collegeDetails", collegeCont.getInternData);
router.all("/**", function (req, res) {         
    res.status(400).send({
        status: false,
        msg: "The api you request is not available"
    })
})

 

module.exports=router