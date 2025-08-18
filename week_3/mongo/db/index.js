const mongoose = require('mongoose');
const {mongoConfig} = require('../config')
const connectWithMongo = () => {
    try {
        mongoose.connect(mongoConfig)
        .then(() => console.log("Successfully connect with the db"))
        .catch((error) => console.log("Not able to connect with the db", error.message))
    } catch (error) {
        console.log("Something went wrong while connecting")
    }
}

connectWithMongo();

// define the scheema
const UserSchema = new mongoose.Schema({
    userName : String,
    firstName : String,
    password : String,
    lastName : String
})

//define the adminSchema 
const adminSchema = new mongoose.Schema({
    userName : String,
    firstName : String,
    password : String,
    lastName : String,
    role : String
})


// create a model based on the schema
const UserModel =  mongoose.model('User', UserSchema)
const AdminModel = mongoose.model('Admin', adminSchema)

module.exports = {
    UserModel,
    AdminModel
}