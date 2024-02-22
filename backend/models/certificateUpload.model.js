const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    gmail: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    courseWeek: {
        type: String,
        required: true
    },
    courseDuration: {
        type: String,
        required: true
    },
    markObtained: {
        type: String,
        required: true
    },
    academicCredit: {
        type: String,
        required: true
    },
    moocSemester: {
        type: String,
        required: true
    },
    sessionYear: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Verified", "Pending", "Rejected"],
        default: "Pending" 
    },
    certificationId: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    }
})

const certificateUpload = mongoose.model('certificate', Schema);
module.exports = certificateUpload;


