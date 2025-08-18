const adminMiddleware = (req, res, next) => {
   try {
      let {userName, firstName, lastName, password, role} = req.body;

      //trim the inputs for avoid the spaces like as " "
       userName = userName.trim();
       firstName = firstName.trim();
       lastName = lastName.trim();
       password = password.trim();
       role = role.trim();

      //basic validation for user inputs
      if(!userName || !firstName || !lastName || !password){
        return res.status(400).json({message : "All fields are required"})
      }

    //   // for checking whether the userName follow the correct email format
      if(!userName.includes("@gmail.com")){
         return res.status(400).json({message : "Not valid email"})
      }

      // for checking whether the password  length should be less than or equal to 6.
      if(password.length < 6){
         console.log("inside the pasword")
         return res.status(400).json({message : "Not valid password"})
      }
      
      next();
   } catch (error) {
       return res.status(500).json({
        message : "Internal server error in middleware"
       })
   }
}

module.exports = adminMiddleware