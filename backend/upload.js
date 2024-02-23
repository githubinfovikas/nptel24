// const multer = require('multer');


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // console.log(req)
//     cb(null, "certificate/");
//   },
//   filename: function (req, file, cb) {
//     console.log(req.body);
//     // Ensure that certificationId and studentName are sent before accessing them
//     const { certificationId, studentName } = req.body;
//     console.log("certificationId", certificationId);
//     console.log("studentName", studentName);
//     cb(null, certificationId + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;







const express = require('express');
const multer = require('multer');

const fs = require('fs');
const path = require('path');

const certificateFolderPath = path.join(__dirname, 'certificate');

// Check if the certificate folder exists
if (!fs.existsSync(certificateFolderPath)) {
    // If it doesn't exist, create it
    fs.mkdirSync(certificateFolderPath);
    console.log('Certificate folder created successfully.');
} else {
    console.log('Certificate folder already exists.');
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, certificateFolderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
