const express = require("express");
const {UserModel} = require("../db");
const router = express.Router();

router.post('/', async(req, res) => {

    try {
        const {userName , firstName, lastName, password} = req.body;

       // check for existing user;
        const existingUser = await UserModel.findOne({userName});
        if(existingUser){
            return res.status(409).json({message : "User already exists"})
        }

        //creatin a new user
        const creatingUser = await UserModel.create({
            userName,
            firstName,
            lastName,
            password
        })
        return res.status(201).json({
            message : "Sucessfully created a new user",
            userData : creatingUser
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server error"
        })
    }
 
})



module.exports = router;