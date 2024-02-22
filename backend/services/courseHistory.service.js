const courseHistorySchema = require('../models/courseHistory.model');
const create = async (data) => {
    return await courseHistorySchema.create(data);
}
const getAll = async () => {
    return await courseHistorySchema.find();
}
const code = async (req, res) => {
    return await courseHistorySchema.find();
}
const remove = async (value) => {
    return await courseHistorySchema.findByIdAndDelete(value);
}
const findCourseCode = async (query) => {
    return await courseHistorySchema.findOne(query);
};

const updateOne = async (id, values) => {
    const query = { _id: id }; 
    return await courseHistorySchema.updateOne(query, values).exec();
  };

const find = async (quary) => {
    return await courseHistorySchema.find(quary).exec();
}

const courseDuration = async (req, res) => {
    return await courseHistorySchema.find();
}

// const xlsx = require('xlsx');
// const Data = require('../models/courseHistory.model');

// async function processUploadedFile(fileBuffer) {
//     const workbook = xlsx.readFile(req.file.path);
//     const sheet_name = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheet_name];
//     const data = xlsx.utils.sheet_to_json(sheet);

    
//     const uniqueEntries = [];

//     for (const row of data) {
//         const existingEntry = await Data.findOne({ courseCode: row.courseCode });
//         if (!existingEntry) {
//             uniqueEntries.push(row);
//         }
//     }

//     return uniqueEntries;
// }

module.exports = {
    create,
    getAll,
    remove,
    findCourseCode,
    updateOne,
    find,
    code,
    courseDuration,
    // processUploadedFile

};