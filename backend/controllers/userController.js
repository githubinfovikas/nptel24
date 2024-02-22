"use strict";
const express = require("express");
const userService = require("../services/userService");
const Jwt = require('jsonwebtoken');
const jwtKey = "secretkey"

const signIn = async (req, res) => {

    try {

        const userFind = await userService.findOne(req.body);
        if (userFind) {
            return res
                .status(400)
                .json({ message: "user already exists" })
        } else {
            const value = {
                name: req.body.name,
                email: req.body.email,
                registrationNumber: req.body.registrationNumber,
                branch: req.body.branch,
                mobileNumber: req.body.mobileNumber,
                batch: req.body.batch,
                password: req.body.password,
                userType: req.body.userType,
                destination: req.body.destination
            }

            const result = await userService.create(value);
            res
                .status(201)
                .json({ message: "sign in successfully" })
        }
    } catch (error) {
        res
            .status(400)
            .json({ message: error.message })
    }
};
const login = async (req, res) => {
    try {
        const data = await userService.findOne(req.body);
        if (data) {
            const token = Jwt.sign({ data }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                res.status(200).json({
                    message: "login successfully",
                    success: true,
                    token: token,
                    data: data
                });
            });

        } else {
            res
                .status(400)
                .json({ message: "user not found" })
        }
    } catch (error) {
        res
            .status(400)
            .json({ message: error.message })
    }
}

const batch = async (req, res) => {
    try {
        const data = await userService.find({ userType: "1" });
        const uniqueBatchesSet = new Set(); // Using Set to store unique elements
        data.forEach(element => {
            uniqueBatchesSet.add(element.batch); // Add each batch to the Set
        });
        const uniqueBatchesArray = Array.from(uniqueBatchesSet); // Convert Set to Array
        uniqueBatchesArray.sort(); // Sort the array
        res.status(200).json(uniqueBatchesArray);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const destination = async (req, res) => {
    try {
        const data = await userService.getAllDestination({ destination: req.body.destination });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const batchAndBranchAndDestination = async (req, res) => {
    try {
        const data = await userService.getAllBatchAndBranchAndDestination({ batch: req.body.batch, branch: req.body.branch });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const result = await userService.deleteUserById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}



// const xlsx = require('xlsx');
// const Data = require('../models/userModel');

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


const xlsx = require('xlsx');
const Data = require('../models/userModel');

async function upload(req, res) {

    try {
        console.log(req.file.path)
        const workbook = xlsx.readFile(req.file.path);
        const sheet_name = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheet_name];
        const data = xlsx.utils.sheet_to_json(sheet);
        let uniqueEntries = [];

        for (const row of data) {
            const existingEntry = await Data.findOne({ email: row.email, mobile: row.mobile });
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

module.exports = { signIn, login, batch, destination, batchAndBranchAndDestination, deleteUserById, upload };