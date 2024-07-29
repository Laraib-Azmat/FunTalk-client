const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs");
const { AddToCloudinary } = require("./cloudinaryUploads");
const jwt = require("jsonwebtoken")

const registerUser = async (req,res)=>{

    try{
        const {name, email, password} = req.body;
        
        const checkEmail = await userModel.findOne({email})
        if(checkEmail){
           return res.json({
                success:false,
                message:"Email already in use"
            })
        }
     let result;
      if(req.file){
         result = await AddToCloudinary(req.file)
      }
        //encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(password, salt)

        const payload = {
            name,
            email,
            profilePic:result?result.secure_url:"",
            publicKey:result?result.public_id:"",
            password:hashedPassword
        }

        const user = new userModel(payload)
        const userSave = await user.save()

        const tokenData = {
            id: userSave?._id,
            email:userSave?.email
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn:"1d"})

        const cookieOption ={
            http:true,
            secure:true
        }

        return res.cookie("token", token, cookieOption).json({
            success:true,
            message:"User created successfully",
            data:userSave
        })

    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"error creating user"
        })
    }
}

module.exports = registerUser