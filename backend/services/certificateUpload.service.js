const certificateUploadSchema = require('../models/certificateUpload.model');
const create = async (data) => {
    return await certificateUploadSchema.create(data);
}
const createCourse = async (courseData) => {
    try {
        const newCourse = await certificateUploadSchema.create(courseData);
        return newCourse;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
};


const getCourseById = async (courseId) => {
    try {
      const course = await certificateUploadSchema.find(courseId);
      return course;
    } catch (error) {
      console.error("Error getting course by ID:", error);
      throw error;
    }
  };

  const getAllCourses = async () => {
  try {
    const allCourses = await certificateUploadSchema.find();
    return allCourses;
  } catch (error) {
    console.error("Error getting all courses:", error);
    throw error;
  }
};


const getAll = async () => {
    return await certificateUploadSchema.find();
}

const findCertificates = async (query) => {
    try {
        return await certificateUploadSchema.find(query);

    } catch (error) {
        console.error(error);
    }
};

const getAllDataBatchAndBranch = async (query) => {
    try {
        return certificateUploadSchema.find(query);
    } catch (error) {
        console.error(error);
    }
}

const removeCertificate = async (value) => {
    return await certificateUploadSchema.findByIdAndDelete(value);
}
const findOne = async (query) => {
    return await certificateUploadSchema.findOne(query).exec();
};

const updateOne = async (id, values) => {
    const query = { _id: id };
    return await certificateUploadSchema.updateOne(query, values).exec();
};

//  const getCertificateCountByStatus = async (query) => {
//     try {
//         return await certificateUploadSchema.countDocuments(query);

//     } catch (error) {
//         console.error(error);
//     }
//  }
const countGmailAndStatus = async (query) => {
    return await certificateUploadSchema.find(query);
}


module.exports = {
    create,
    getAll,
    removeCertificate,
    findOne,
    updateOne,
    findCertificates,
    getAllDataBatchAndBranch,
    countGmailAndStatus,
    createCourse,
    getCourseById,
    getAllCourses

};