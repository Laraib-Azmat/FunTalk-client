const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const userDetails = require("../controller/userDetails")
const userModel = require("../models/userModel")
const { chatModel, messageModel } = require("../models/chatModel")
const getConversation = require("../middleWare/getConversation")

const app = express()

    //   socket connection
const server = http.createServer(app)
const io= new Server(server,{
    cors:{
        origin: window.location.origin,
        credentials: true
    }
})

//online user
const onlineUser = new Set()

io.on("connection",async (socket)=>{

    console.log("Connected User ",socket.id);

    const token = socket.handshake.auth.token
    
    //current user details
      const user  =  await userDetails(token)
    //creating room 
    if(user){socket.join(user?._id.toString())
    onlineUser.add(user?._id?.toString())}

    io.emit("onlineUser",Array.from(onlineUser))

    socket.on("message-page", async (userId) => {
        try {
            const userDetail = await userModel.findById(userId).select("-password");
            
            if (!userDetail) {
                socket.emit("message-error", { message: "User not found" });
            
            }
    
            const payload = {
                _id: userDetail._id,
                name: userDetail.name,
                email: userDetail.email,
                profilePic: userDetail.profilePic,
                online: onlineUser.has(userId)
            };
    
            socket.emit("message-user", payload);
    
            // Get previous messages
            const getConversationMessages = await chatModel.findOne({
                "$or": [
                    { sender: user?._id, receiver: userId },
                    { sender: userId, receiver: user?._id }
                ]
            }).populate('message').sort({ updatedAt: -1 });
    
            socket.emit('message', getConversationMessages?.message || []);
        } catch (error) {
            socket.emit("message-error", { message: "An error occurred" });
            console.error("error: ",error); // Log the error for debugging
        }
    });

   

    // new message
    socket.on("new-message", async(data)=>{

        try {

        // check available conversation
        let conversation = await chatModel.findOne({
            "$or" : [
                {sender : data?.sender, receiver:data?.receiver},
                {sender :data?.receiver , receiver:data?.sender}
            ]
        })

        if(!conversation){
                const createConversation = await chatModel({
                    sender : data?.sender,
                    receiver: data?.receiver
                })
                conversation = await createConversation.save()
        }
        const message = new messageModel({
            text:data?.text,
            imageUrl:data?.image,
            vedioUrl:data?.video,
            publickKey:data?.publicKey,
            msgBy: data?.msgBy
        })

        const saveMessage = await message.save()

        const updateConversation = await chatModel.updateOne({_id: conversation?._id},{
             "$push":{message: saveMessage?._id}
        })

        const getConversationMessages = await chatModel.findOne({
            "$or" : [
                {sender : data?.sender, receiver:data?.receiver},
                {sender :data?.receiver , receiver:data?.sender}
            ]
        }).populate('message').sort({updatedAt :-1})


        io.to(data?.sender).emit("message",getConversationMessages?.message || [])
        io.to(data?.receiver).emit("message",getConversationMessages?.message || [])

        //send conversation
        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        io.to(data?.sender).emit("conversation",conversationSender)
        io.to(data?.receiver).emit("conversation",conversationReceiver)


    }catch (error) {
        console.error("Error handling new message event:", error);
      }
    })

    //sidebar
    socket.on("sidebar", async (currentUserId)=>{

    const conversation = await getConversation(currentUserId)
    socket.emit('conversation',conversation)
})

//seen messages
   socket.on('seen', async (msgById)=>{
    let conversation = await chatModel.findOne({
        "$or" : [
            {sender : user?._id, receiver:msgById},
            {sender :msgById , receiver:user?._id}
        ]
    })

    let conversationMessageId = conversation?.message || []
    const updateMessages = await messageModel.updateMany(
        {_id: { "$in" : conversationMessageId }, msgBy :msgById},
        { "$set" : { seen : true } }
    )
    //send conversation
    const conversationSender = await getConversation(user?._id.toString())
    const conversationReceiver = await getConversation(msgById)

    io.to(user?._id.toString()).emit("conversation",conversationSender)
    io.to(msgById).emit("conversation",conversationReceiver)
   })

    //disconnect
    socket.on('disconnect',()=>{
       if(user){ onlineUser.delete(user._id.toString())}
        console.log("Disconnect user",socket.id);
    })
})

module.exports = {
    app,
    server
}