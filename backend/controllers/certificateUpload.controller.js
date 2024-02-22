const certificateUploadService = require('../services/certificateUpload.service');

    
const createCourseController = async (req, res) => {
    const {studentName, gmail, registrationNumber, branch, batch, courseCode, courseName, courseWeek, courseDuration, markObtained, academicCredit, moocSemester, sessionYear } = req.body;
    const data = {
        studentName, gmail,  registrationNumber, branch,batch, courseCode,courseName,
        courseWeek, courseDuration, markObtained,academicCredit,
        moocSemester, sessionYear,certificationId: req.file.filename,
    }
    try {
        const course = await certificateUploadService.findOne({certificationId: data.certificationId});
        if (course) {
            return res
                .status(400)
                .json({ message: "course already uploaded" })
        } else {
            const newCourse = await certificateUploadService.createCourse(data);
            res.status(201).json({
                success: true,
                message: "Course created successfully",
                data: newCourse,
            });
        }
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
};


const getAllCertificates = async (req, res) => {
    try {
        const certificates = await certificateUploadService.getAll();
        res.status(200).json(certificates);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const findCertificates = async (req, res) => {
    try {
        const uploadDetails = await certificateUploadService.findCertificates({ gmail: req.params.id });
        if (uploadDetails.length > 0) {
            res.status(200).json(uploadDetails);
        } else {
            res.status(404).json({ error: 'No data found for the given email' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getAllDataBatchAndBranch = async (req, res) => {
    const { batch, branch, moocSemester, academicCredit } = req.body;
    try {
        const data = await certificateUploadService.getAllDataBatchAndBranch({ batch, branch, moocSemester, academicCredit });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const countGmailAndStatus = async (req, res) => {
    const { gmail, status } = req.body;
    try {
        const result = await certificateUploadService.countGmailAndStatus({ gmail, status });
        res.status(200).json(result.length);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const removeCertificate = async (req, res) => {
    try {
        const certificateId = req.params.id;
        const result = await certificateUploadService.removeCertificate(certificateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateCertificate = async (req, res) => {
    try {
        const _id = req.params.id;
        const values = req.body.status;
        const result = await certificateUploadService.updateOne({ _id: _id }, { $set: { status: values } });
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getAllCertificates,
    findCertificates,
    removeCertificate,
    // getCertificateById,
    updateCertificate,
    getAllDataBatchAndBranch,
    countGmailAndStatus,
    createCourseController,
};
