const mongoose = require('mongoose');
const {mongoConfig} = require('../config')

console.log(mongoConfig)
const connectMongo = () => {

    try {
        mongoose.connect(mongoConfig)
       .then(() => console.log("Successfully connected with the db"))
       .catch((err) => console.log("The mongo error is  ", err)) 
    } catch (error) {
        console.log("Something went wrong while connecting")
    }
}



// define the schema for the admin, user and the courses
const adminSchema = new mongoose.Schema({
    userName : String,
    password : String,
    role : {
        type : String,
        default : 'admin'
    }
})
const userSchema  = new mongoose.Schema({
    userName : String,
    password : String,
    purchaseCourse : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    
  
})

const courseSchema   = new mongoose.Schema({
    courseName : String,
    courseDescription : String,
    courseInstructor : String,
    courseRating : Number,
    userCourse : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    adminCourse : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin'
    }
})

// define the model for the schema 
const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)

// export the model for using 
module.exports = {
    connectMongo,
    User,
    Admin,
    Course
}


