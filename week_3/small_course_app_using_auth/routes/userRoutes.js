const { Router } = require("express");
const router = Router();
const {User, Course} = require('./../db')
const {userSignUp, userSignIn, authenticateUser} = require("../middlewares/userMiddleware");
const bcrypt  =  require("bcryptjs")
// User Routes
router.post('/signup', userSignUp, async(req, res) => {
   try {
       let userName = req.body.userName;
       let password = req.body.password;
       console.log("The username and the password ", userName, password)
       const hashPassword = await bcrypt.hash(password, 10);
       console.log("The hash password is ", hashPassword)
       // create a new user 
       const newUser = new User({
            userName : userName,
            password : hashPassword
       })
       await newUser.save();
       return res.status(201).json({
          message : "Successfully created a user"
       })
   } catch (error) {
      return res.status(500).json({
        message : "Internal Server Error"
      })
   }
});

router.post('/signin', userSignIn, (req, res) => {
    // Implement admin signup logic
    return res.status(200).json({
        token : req.token,
        message : "Login Successfully",
        user : req.user
    })
});

router.get('/user/courses', async(req, res) => {
    // Implement listing all courses logic
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

router.post('/courses/:courseId', authenticateUser, async(req, res) => {
    // Implement course purchase logic
    try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId);
        if(!course) return res.status(404).json({
            message : "Course not founde in the lists"
        })
        // check the user whether it is exist or not
        let user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({
            message : "user not found"
        })}
          // check if user already purchase or not
        if(user.purchaseCourse.includes(courseId)){
           return res.status(400).json({
            message : "User have already purchase course"
           })
        }
        
        // save it into the db
        user.purchaseCourse.push(courseId);
        await user.save();

      
        return res.status(200).json({
            message : "Successfully purchased the course",
            course : course
        })
    } catch (error) {
        console.log("the error is ", error)
        return res.status(500).json({
            message : "Internal Server error"
        })
    }
});

router.get('/purchasedCourses/:userId', authenticateUser, async(req, res) => {
    // Implement fetching purchased courses logic
    try {
        let {userId} = req.params;
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message : "user not found"
            })
        }
       console.log("the user courses are", user.purchaseCourse)
        // check that user has purchase course or not
        if(user.purchaseCourse.length <= 0){
            return res.status(400).json({
                message : "user does not have any course"
            })
        }
        const userCourse = await Course.find({_id :  { $in: user.purchaseCourse }})
        console.log("THe xourses are" , userCourse)
         if(!userCourse){
            return res.status(404).json({
                message : "Empty course of users "
            })
         }
        return res.status(200).json({
            message : "ALl the user courses",
            courses : userCourse
        })
    } catch (error) {
        console.log("The error is ", error)
          return res.status(500).json({
            message : "Iinternal Server Error"
          })
    }
});

module.exports = router