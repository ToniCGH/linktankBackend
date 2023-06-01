const User = require("./userModel")
const jwt = require("jsonwebtoken");

// exports.signUp = async (req, res) => {
//     try {
//         const newUser = await User.create(req.body)
//         res.status(200).send({ username: newUser.username })
//     } catch (err) {
//         console.log(err)  
//         res.status(500).send({ error: err.message })    
//     }
// }

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
        res.status(200).send({
            message: "Sucessful user creation",
            user: newUser,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        res.status(200).send({ user: req.user })
    } catch (err) {
        console.log(err)
    }
}

// exports.listUsers = async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.status(200).send({ users })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ error: err.message })
//     }
// }

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        res.status(200).send({ user })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
}

// exports.updateUser = async (req, res) => {
//     const id = req.params.id
//     try {
//         const user = await User.updateOne(
//             { _id: id },
//             { username: req.body.username }
//         )
//         res.status(200).send({ user })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ error: err.message })
//     }
// }

exports.updateUser = async (req, res) => {
    try {
        await User.updateOne(
            { username: req.body.username },
            { $push: {socialLinks: req.body.updateObj} }
        )
        const user = await User.findOne({username: req.body.username})
        res.status(200).send({ user })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.deleteOne({ _id: id })
        res.status(200).send({ user })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
}