const {Admin} = require('../db')
const jwt = require("jsonwebtoken")
const bcrypt  = require('bcryptjs')
const jwtPassword = 'secret';


/*----------- Validation SignUp Middleware -------------- */

function adminSignUp(req, res, next){

   try {
      let userName = req.body.userName;
      let password = req.body.password;
      let role = req.body.role;


      // trim the input for avoiding the un-necessary white-spaces
      userName = userName.trim();
      password = password.trim();
      role = role.trim();

      // validates the input 
      if(!userName || !password) return res.status(400).json({message : "Please provide the require details"})

      if(!userName.includes("@gmail.com")){
         return res.status(400).json({message : "Email must be correct"})
      } 

      if(password.length < 6){
         return res.status(400).json({message : "Password length must be at least 6"})
      }  
      next();
   } catch (error) {
       return res.status(500).json({
         message : "Internal Server Error"
       })
   }
}

/*---------------- Validates the SignIn Middleware ---------------- */
async function adminSignIn(req, res, next){
 
   try {
      let {userName, password, role} = req.body;
      
      // trim the inputs
      userName = userName.trim();
      password = password.trim();
      role = role.trim()

      // check whether the user exit or not
      const existAdmin = await Admin.findOne({userName})
      if(!existAdmin){
         return res.status(404).json({message : "USer does not exsit"})
      }

      // compare the password with the db hash password
      const isMatch = bcrypt.compare(password, existAdmin.password);
      if(!isMatch) {
         return res.status(400).json({
            message : "Passoword does not match"
         })
      }

      // generate a new token 
      const token = jwt.sign({id : existAdmin._id}, jwtPassword, {expiresIn: "24h"});
      
      req.admin = existAdmin
      req.role = role
      req.token = token

      next();
   } catch (error) {
       return res.status(500).json({message : "Internal Server Error"})
   }
}

/*--------------- Authenticate Middleware --------------- */
function authenticateAdmin(req, res, next){

   try {
       // needs the headers for the protected routes access
      const authHeader = req.headers["authorization"];
      if(!authHeader || !authHeader.startsWith("Bearer")) return res.status(401).json({message : "Token is not provided"});

      const token = authHeader.split(" ")[1];
      console.log("the token is being process")
      if(!token) return res.status(401).json({message : "Invalid token format"});
      console.log("the token i get");
      //verify the token
      jwt.verify(token, jwtPassword, (err, decode) => {
         console.log("inside the verfication")
         if(err) return res.status(403).json({message : err.message});
         console.log("after i get err the verfication")
         req.userId = decode.id;
         next();

      })
   } catch (error) {
      return res.status(500).json({message : "Internal Server Error"})
   }

}

module.exports = {
   adminSignIn,
   adminSignUp,
   authenticateAdmin
}

