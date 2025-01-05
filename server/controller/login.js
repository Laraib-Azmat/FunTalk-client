const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

const login = async (req,res)=>{

    const {email, password}  = req.body
     const user = await userModel.findOne({email})

    if(user){

        const passCompare = await bcrypt.compare(password, user.password)
        if(passCompare){

            const tokenData = {
                id: user._id,
                email:user.email
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            const cookieOption ={
                http:true,
                secure:true
            }

            res.cookie("token", token, cookieOption).json({success:true,message:"Login success", token})
        }else{
            res.json({success:false, message:"Incorrect password"})
        }

    }else{
        res.json({success:false, message:"Email not exist"})
    }

}

module.exports = login