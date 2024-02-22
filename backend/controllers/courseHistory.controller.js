const courseHistoryService = require('../services/courseHistory.service');

const getAll = async (req, res) => {
    try {
        const products = await courseHistoryService.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const code = async (req, res) => {
    try {
        let data = await courseHistoryService.code();
        res.status(200).json(data.map(course => course.courseCode));
    } catch (error) {
        res.send(error);
    }
}

const findCourseCode = async (req, res) => {
    try {
        let course = await courseHistoryService.findCourseCode({ courseCode: req.params.id });
        res.status(200).json(course);
    } catch (error) {
        res.send(error);
    }
}

let search = async (req, res) => {
    try {
        let course = await courseHistoryService.find({
            "$or": [
                { courseCode: { $regex: req.params.key } },
            ]
        });

        res.send(course);
    } catch (error) {
        res.send(error);
    }
};

const remove = async (req, res) => {
    try {
        const result = await courseHistoryService.remove(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}



const courseDuration = async (req, res) => {
    try {
        const data = await courseHistoryService.find({});
        const uniqueCourseDurationSet = new Set(); // Using Set to store unique elements
        data.forEach(element => {
            uniqueCourseDurationSet.add(element.duration); // Add each courseDuration to the Set
        });
        const uniqueCourseDurationArray = Array.from(uniqueCourseDurationSet); // Convert Set to Array
        res.status(200).json(uniqueCourseDurationArray);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const courseDurationData = async (req, res) => {
    try {
        const data = await courseHistoryService.find({ duration: req.body.duration });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const xlsx = require('xlsx');
const Data = require('../models/courseHistory.model');


// async function upload(req, res) {
//     const workbook = xlsx.readFile(req.file.path);
//     const sheet_name = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheet_name];
//     const data = xlsx.utils.sheet_to_json(sheet);

//     try {
//         await Data.insertMany(data);
//         res.status(200).send('Data uploaded successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error uploading data to MongoDB');
//     }
// };

async function upload(req, res) {

    try {
        console.log(req.file.path)
        const workbook = xlsx.readFile(req.file.path);
        const sheet_name = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheet_name];
        const data = xlsx.utils.sheet_to_json(sheet);
        let uniqueEntries = [];

        for (const row of data) {
            const existingEntry = await Data.findOne({ courseCode: row.courseCode});
            if (!existingEntry) {
                uniqueEntries.push(row);
            }
        }
        await Data.insertMany(uniqueEntries);
        res.status(200).send('Data uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading data to MongoDB');
    }
}


module.exports = {
    search,
    getAll,
    code,
    findCourseCode,
    remove,
    courseDuration,
    courseDurationData,
    upload
}