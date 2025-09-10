const {User} = require('../db')
const jwt = require("jsonwebtoken")
const bcrypt  = require('bcryptjs')
const jwtPassword = 'secret';


/*----------- Validation SignUp Middleware -------------- */

function userSignUp(req, res, next){

   try {
      let userName = req.body.userName;
      let password = req.body.password;

      // trim the input for avoiding the un-necessary white-spaces
      userName = userName.trim();
      password = password.trim();

      // validates the input 
      if(!userName || !password) return res.status(400).json({message : "Please provide the require details"})

      if(!userName.includes("@gmail.com")){
         console.log("inside the email valid")
         return res.status(400).json({message : "Email must be correct"})
      } 

      if(password.length < 6){
          console.log("inside the email valid")
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
async function userSignIn(req, res, next){
 
   try {
      let {userName, password} = req.body;
      
      // trim the inputs
      userName = userName.trim();
      password = password.trim();

      // check whether the user exit or not
      const existUser = await User.findOne({userName})
      if(!existUser){
         return res.status(404).json({message : "USer does not exsit"})
      }

      // compare the password with the db hash password
      const isMatch = bcrypt.compare(password, existUser.password);
      if(!isMatch) {
         return res.status(400).json({
            message : "Passoword does not match"
         })
      }

      // generate a new token 
      const token = jwt.sign({id : existUser._id}, jwtPassword, {expiresIn : '24h'});
      
      req.user = existUser
      req.token = token

      next();
   } catch (error) {
       return res.status(500).json({message : "Internal Server Error"})
   }
}

/*--------------- Authenticate Middleware --------------- */
 function authenticateUser(req, res, next){

   try {
       // needs the headers for the protected routes access
      const authHeader = req.headers["authorization"];
      if(!authHeader || !authHeader.startsWith("Bearer")) return res.status(401).json({message : "Token is not provided"});

      const token = authHeader.split(" ")[1];
      if(!token) return res.status(401).json({message : "Invalid token format"});

      //verify the token
      jwt.verify(token, jwtPassword, (err, decode) => {
         if(err) return res.status(403).json({message : "Expire token"});
         req.userId = decode.id;
         next();

      })
   } catch (error) {
      return res.status(500).json({message : "Internal Server Error"})
   }

}

module.exports = {
  userSignIn,
  userSignUp,
  authenticateUser
}

