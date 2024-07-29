const { chatModel } = require("../models/chatModel")


const getConversation = async (currentUserId)=>{
    if(currentUserId){
        const currentUserConversation = await chatModel.find({
            "$or" : [
                {sender: currentUserId},
                {receiver: currentUserId}
            ]
        }).populate('message').sort({updatedAt :-1}).populate('sender').populate('receiver')

        const conversation = currentUserConversation.map(conv=>{
            const countUnseenMsg = conv?.message?.reduce((prev,curr)=>{
                const msgById = curr?.msgBy?.toString()
                if(msgById !== currentUserId){
                return prev + (curr?.seen ? 0:1)
                }else{
                    return prev
                }
            },0)
            return {
                id : conv?._id,
                sender : conv?.sender,
                receiver : conv?.receiver,
                unseenMsg : countUnseenMsg,
                lastMsg : conv.message[conv?.message?.length-1]
            }
        })

        return conversation
        
}else{
    return []
}}


module.exports = getConversation