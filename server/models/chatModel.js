const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        default:""
    },
    vedioUrl:{
        type:String,
        default:""
    },
    publickKey:{
        type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default:false
    },
    msgBy:{
        type : mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true
})

const chatSchema = new mongoose.Schema({
    sender:{
        type : mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    receiver :{
        type : mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    message:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"Message"
        }
    ]
},{
    timestamps:true
})

const messageModel = mongoose.model("Message", messageSchema)
const chatModel = mongoose.model("Chats", chatSchema)

module.exports = {chatModel, messageModel}