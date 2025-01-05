const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs");
const auth = require("../middleWare/auth");

const deleteAccount = async (req, res)=>{
    try{
   
        const token = req.cookies.token || ""
        const userId = await auth(token)

        if(userId.logout){
            res.json({logout:true, message:userId.message})
          }else{
            
            //find user by ID
            const user = await userModel.findById(userId);
            if(user){
                //Match Password
                const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
                if(isPasswordCorrect){
                        //Delete User
                        await userModel.findByIdAndDelete(userId)
                        res.json({success:true, message:"Account Deleted Permanently!"})
                }else{
                    res.json({success:false, message:"Password incorrect!"})
                }
            }else{
                res.json({logout:true, message:"User not Found..."})
            }
          }

    }catch(error){
    console.log(error);
    res.json({success:false, message:"Error deleting user"})
    }
}

module.exports = deleteAccount;