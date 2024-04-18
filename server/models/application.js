
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const applicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    teacher_email: {
        type: String,
        required: true,
    },
    student_email: {
        type: String,
        required: true,
    },
    cgpa: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
    },
    
 
   
});



const Application =    mongoose.model("Application", applicationSchema);

module.exports = Application;