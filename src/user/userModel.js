const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true
    },
    socialLinks: {
        type: Array
    }
})

const User = mongoose.model("User", userSchema)

User.createIndexes()

module.exports = User