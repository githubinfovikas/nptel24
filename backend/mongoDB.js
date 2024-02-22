// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // const mongoDB = 'mongodb+srv://vitmitm:vikas@cluster0.sihpvbf.mongodb.net/dashboard?retryWrites=true&w=majority'
        const mongoDB = 'mongodb+srv://vikasvikas:vikas@cluster0.xcpgntg.mongodb.net/nptel?retryWrites=true&w=majority'

        // mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connect(mongoDB);

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "Connection error: "));
       
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
