const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true, "provide name"]
    },
    email:{
        type:String,
        required:[true, "provide email"],
        unique:true
    },
    password:{
        type:String,
        required :[true, "provide password"]
    },
    profilePic :{
        type:String,
        default:""
    },
    publicKey:{
        type:String,
        default:""
    }
},{
    timestamps :true
})

const userModel =  mongoose.model("User", userSchema )
module.exports = userModel;