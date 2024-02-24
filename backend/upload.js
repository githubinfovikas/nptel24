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



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./certificate/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;






// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// // Get the absolute path of the directory containing the current script
// const scriptDirectory = path.dirname(require.main.filename);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Concatenate the script directory with the relative path to the destination
//     const destinationPath = path.join(scriptDirectory, "certificate");
//     cb(null, destinationPath);
//   },
//   filename: function (req, file, cb){
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
