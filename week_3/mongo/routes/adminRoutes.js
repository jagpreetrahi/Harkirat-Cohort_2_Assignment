const express = require("express");
const {AdminModel} = require("../db");
const router = express.Router();

router.post('/', async(req, res) => {

    try {
        const {userName , firstName, lastName, password, role} = req.body;
        console.log("insdie the try")
        // check for existing user;
        const existingAdmin = await AdminModel.findOne({userName});
        if(existingAdmin){
            return res.status(409).json({message : "User already exists"})
        }

        //creatin a new user
        const creatingAdmin = await AdminModel.create({
            userName,
            firstName,
            lastName,
            password,
            role
        })
        return res.status(201).json({
            message : "Sucessfully created a new user",
            userData : creatingAdmin
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server error"
        })
    }
 
})



module.exports = router;