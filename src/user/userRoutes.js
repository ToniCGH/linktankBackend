const { Router } = require("express")

const { signUp, getUser, updateUser, deleteUser, login } = require("./userControlles")
const { hashPass, authenticate, authenticateEmail, tokenCheck } = require("../middleware")

const userRouter = Router()

userRouter.post("/user", authenticateEmail, hashPass, signUp)
userRouter.post("/user/login", authenticateEmail, authenticate, login)
userRouter.post("/user/getUser", getUser)
userRouter.put("/user", updateUser)
userRouter.delete("/user/:id", deleteUser)

userRouter.get("/token", tokenCheck, login);

module.exports = userRouter