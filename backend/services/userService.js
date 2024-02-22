const userSchema = require('../models/userModel');

const create = async (data) => {
    return await userSchema.create(data);
}

const find = async () => {
    return await userSchema.find();
}

const remove = async (id) => {
    return await userSchema.findByIdAndDelete(id);
}

const findOne = async (query) => {
    return await userSchema.findOne(query);
}

const getAllDestination = async (query) => {
    try{
        return userSchema.find(query);
    }catch(error){
        console.error(error);
    }
}
const getAllBatchAndBranchAndDestination = async (query) => {
    try{
        return userSchema.find(query);
    }catch(error){
        console.error(error);
    }
}
const deleteUserById = async (query) => {
    return await userSchema.findByIdAndDelete(query);
}

module.exports = {
    create,
    find,
    remove,
    findOne,
    getAllDestination,
    getAllBatchAndBranchAndDestination,
    deleteUserById
}