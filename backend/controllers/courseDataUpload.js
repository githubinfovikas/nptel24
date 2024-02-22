// const xlsx = require('xlsx');
// const Data = require('../models/courseHistory.model');

// async function upload(req, res) {
//     if (!req.files || !req.files.file) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     const file = req.files.file;
//     try {
//         const workbook = xlsx.read(file.data);
//         const sheet_name = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheet_name];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         await Data.insertMany(data);
//         res.status(200).send('Data uploaded successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error uploading data to MongoDB');
//     }
// }
// module.exports = {
//     upload,
// };
