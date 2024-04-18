const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const researchSchema = new mongoose.Schema({
    teacher_n: {
        type: String,
        required: true,
    },
    teacher_email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    additional: {
        type: String,
        required: false,
    },
    
 
   
});



const Research =    mongoose.model("RESEARCH", researchSchema);

module.exports = Research;