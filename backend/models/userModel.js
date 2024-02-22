const mongoose = require('mongoose');
const Schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        // required: true
    },
    branch: {
        type: String,
        // required: true
    },
    mobileNumber: {
        type: String,
        required: true

    },
    batch:{
        type:String,
        // required:true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: "1"   
    },
    branchCode: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    destination: {
        type: String,
        default: "student"
    }
})


const SignUp = mongoose.model('User', Schema);
module.exports = SignUp;