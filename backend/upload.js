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







// const express = require('express');
// const multer = require('multer');

// const fs = require('fs');
// const path = require('path');



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./certificate/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });




const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'certificate';
    const dir = path.join(__dirname, uploadDir);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, uploadDir); // Destination directory
  },
  filename: function (req, file, cb) {
    // Use original name for the uploaded file
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
