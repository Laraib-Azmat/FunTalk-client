const express = require("express")
const cors = require("cors");
const connectDb = require("./config/db");
const userRouter = require("./route/userRoute");
const cookieParser = require("cookie-parser");
const { app,server } = require("./socket/index");
const path = require("path")
require('dotenv').config()

//initialize app
// const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 4000

//endpoints
app.use("/api/user", userRouter)


//db connection
app.get("/", (req,res)=>{
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

connectDb().then(()=>{

    server.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
    })
})
