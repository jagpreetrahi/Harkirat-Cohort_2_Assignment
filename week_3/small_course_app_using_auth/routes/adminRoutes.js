const { Router } = require("express");
const {adminSignIn, adminSignUp, authenticateAdmin}  = require("../middlewares/admin-middleware");
const {Admin, Course} = require("../db")
const router = Router();
const bcrypt = require('bcryptjs');

// Admin Routes
router.post('/signup',adminSignUp, async(req, res) => {
    try {
        let {userName, password , role} = req.body;
       const hashPassword = await bcrypt.hash(password, 10);
        
        //creates a new admin
        const newAdmin = new Admin({
            userName : userName,
            password : hashPassword,
            role : role
        })
        await newAdmin.save();
        return res.status(201).json({
            message : "Successfully created a new admin"
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
});

router.post('/signin', adminSignIn, (req, res) => {
     return res.status(200).json({
        message : "Login successfully",
        token : req.token,
        admin : req.admin,
        role : req.role
     })
});

router.post('/courses', authenticateAdmin, async(req, res) => {

    try {
         // Implement course creation logic
        let {courseName, courseDescription, courseInstructor, courseRating} = req.body;
        // trim the input of the course
        courseName = courseName.trim()
        courseDescription = courseDescription.trim()
   
        courseInstructor = courseInstructor.trim()

        if(!courseName || !courseDescription || !courseInstructor || !courseRating) return res.status(400).json({
            message  : "Please provide the all details"
        })

        // create a new course
        const newCourse = new Course({
            courseName,
            courseDescription,
            courseRating,
            courseInstructor
        })
        await newCourse.save();
        console.log("what happens here")
        return res.status(201).json({message : "Successfully creted the new course"})
    } catch (error) {
        console.log("the error is ", error)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
   
});

router.get('/courses', authenticateAdmin, async(req, res) => {
    // Implement fetching all courses logic
    try {
        const findCourses = await Course.find();
        if(!findCourses) return res.status(403).json({
            message : "There is no course available now"
        })
        return res.status(200).json({
            message : "All the requires courses ",
            courses : findCourses
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
    

});

module.exports = router;