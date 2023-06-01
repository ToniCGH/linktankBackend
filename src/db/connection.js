require("dotenv").config()
const mongoose = require("mongoose")

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Successfully connected")
    } catch (err) {
        console.log(err)
    }
}

connection()