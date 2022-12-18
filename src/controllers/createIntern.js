const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const mongoose = require('mongoose');
const { isValid } = require("../validator/validation");


const createIntern = async function (req, res) {
    try {
        //get data from the body
        let requestbody = req.body

        // check there is any data or not
        if (Object.keys(requestbody).length == 0) return res.status(400).send({ status: false, message: "please enter data" })

        // check there is any name in data if yes check should be valid 
        if (!requestbody.name.trim()) {
            return res.status(400).send({ status: false, message: "provide name , it's mandatory" })
        }
        if (!isValid.personName(requestbody.name)) {
            return res.status(400).send({ status: false, message: " name contains only string form" })
        }
    
        // check there is any email in data if yes check should be valid and not reserved
        if (!requestbody.email) {
            return res.status(400).send({ status: false, message: "Please provide email" })
        }
        if (!isValid.email(requestbody.email)) {
            return res.status(400).send({ status: false, message: "Enter valid email" })
        }
        let checkEmail = await internModel.findOne({ email: requestbody.email })
        if (checkEmail) {
            return res.status(400).send({ status: false, message: "this email is already reserved" })
        }

        // check there is any mobile in data if yes check should be valid and not reserved
        if (!requestbody.mobile) {
            return res.status(400).send({ status: false, message: "Please provide indian  mobile no" })
        }
        if (!isValid.mobile(requestbody.mobile)) {
            return res.status(400).send({ status: false, message: "Enter valid mobile" })
        }
        let checkMobile = await internModel.findOne({ mobile: requestbody.mobile })
        if (checkMobile) {
            return res.status(400).send({ status: false, message: "this mobile number is already reserved" })
        }

        // check there is any collegeName in requestedbody if yes shoud be valid
        if (!requestbody.collegeName) {
            return res.status(400).send({ status: true, message: "Please provide collegeName" })
        }
        if (!isValid.sortName(requestbody.collegeName)) {
            return res.status(400).send({ status: false, messege: "collegeName is not valid,please enter valid collegeName" })
        }
        let collegebyName = await collegeModel.findOne({ name: requestbody.collegeName }).select({_id:1})
       
        if (!collegebyName) {
            return res.status(400).send({ status: false, messege: "college is not exist" })
        }
        // add collegeId in requestbody 
        requestbody.collegeId=collegebyName._id
        // now resistor form
        let internCreated = await internModel.create(requestbody)

        // destructured internCreated 
        const {name,email,mobile,collegeId,isDeleted}=internCreated
        // structured in a object
        const output={name,email,mobile,collegeId,isDeleted}

        res.status(201).send({ status:true,data:output })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.createIntern = createIntern