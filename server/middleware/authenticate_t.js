const jwt =require('jsonwebtoken')
const User=require('../models/teacher')


const authenticate = async (req, res, next) => {
    try {
       const token=req.cookies.jwtToken
       const verifyToken=jwt.verify(token,"secret key")
       const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

       if(!rootUser){
        res.send("error")
       }

       req.token=token
       req.rootUser=rootUser
       req.userID=rootUser._id
       next()
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error: ' + err.message); // Send the actual error message
    }
    
}
module.exports = authenticate;