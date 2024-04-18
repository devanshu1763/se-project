const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const teacherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    branch: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

teacherSchema.methods.generateAuthToken=async function () {
    try{
         let token=jwt.sign({_id:this._id},"secret key")
        
         this.tokens=this.tokens.concat({token:token})
         await this.save();
         return token;
    }catch(err){
console.log("error")
    }

}
const Teacher =    mongoose.model("TEACHER", teacherSchema);

module.exports = Teacher;