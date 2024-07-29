const mongoose = require("mongoose")

const connectDb = async()=>{
    try{

        await mongoose.connect(process.env.MONGOOSE_URL)
        const connection = mongoose.connection
        connection.on("connected", ()=>{
            console.log("Connected to database")
        })

        connection.on("error", (error)=>{
            console.log("Something went wrong",error);
        })

    }catch(error){
        console.log(error)
    }
}

module.exports =  connectDb