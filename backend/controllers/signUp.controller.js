// "use strict";
// const express = require("express");
// const SignUpSchema = require('../models/signUp.model');
// const Jwt = require('jsonwebtoken');
// const jwtKey = "secretkey"

// const signIn = async (req, res) => {

//     try {

//         const userFind = await SignUpSchema.findOne(req.body);
//         if (userFind) {
//             return res
//                 .status(400)
//                 .json({ message: "user already exists" })
//         } else {
//             const userType = "1"
//             const value ={
//                 name: req.body.name,
//                 email: req.body.email,
//                 registrationNumber: req.body.registrationNumber,
//                 branch: req.body.branch,
//                 mobileNumber: req.body.mobileNumber,
//                 batch: req.body.batch,
//                 password: req.body.password,
//                 userType:userType,  
//             }
//             console.log(value)

//             const result = await SignUpSchema.create(value);
//             res
//                 .status(201)
//                 .json({ message: "sign in successfully" })
//             console.log(result);
//         }
//     } catch (error) {
//         res
//             .status(400)
//             .json({ message: error.message})
//     }
// };
// const login = async (req, res) => {
//     try {
//         const data = await SignUpSchema.findOne(req.body);
//         if (data) {
//             const token = Jwt.sign({ data }, jwtKey, { expiresIn: '3h' }, (err, token) => {
//                 res.status(200).json({
//                     message: "login successfully",
//                     success: true,
//                     token: token,
//                     data: data 
//                 });
//             });

//         } else {
//             res
//                 .status(400)
//                 .json({ message: "user not found" })
//         }
//     } catch (error) {
//         res
//             .status(400)
//             .json({ message: error.message })
//     }
// }

// const batch = async (req, res) => {
//     try {
//         const data = await SignUpSchema.find({ userType: "1" });
//         const batch = {};
//         data.forEach(element => {
//             if (!batch[element.batch]) {
//                 batch[element.batch] = true; 
//             }
//         });
//         const uniqueBatches = Object.keys(batch);
//         res.status(200).json(uniqueBatches);

//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }


// module.exports = {signIn, login, batch}