const express = require('express');
const registerUser = require("../controller/register")
const login = require("../controller/login")
const logoutUser = require("../controller/logout")
const { updateUserName, updateEmail, updateProfilePic } = require("../controller/updateUser");
const searchUser = require('../controller/searchUser');
const getDetails = require('../controller/getDetails');
const deleteAccount = require('../controller/deleteAccount');



const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login" , login)
userRouter.get("/logout", logoutUser)
userRouter.post("/updateName", updateUserName)
userRouter.post("/updateEmail",updateEmail)
userRouter.post("/updatePic",updateProfilePic)
userRouter.get("/user-details", getDetails)
userRouter.post("/searchUser", searchUser)
userRouter.post("/delete-account", deleteAccount)


module.exports = userRouter