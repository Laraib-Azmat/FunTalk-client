const auth = require("../middleWare/auth");
const userModel = require("../models/userModel");
const { AddToCloudinary, deleteFromCloudinary } = require("./cloudinaryUploads");

//username
const updateUserName = async (req,res)=>{
try{

   const token = req.cookies.token || ""
   const userId = await auth(token)
   if(userId.logout){
     res.json({logout:true, message:userId.message})
   }else{
    await userModel.findByIdAndUpdate(userId, {name:req.body.name})

    res.json({success:true, message:"Name updated!"})
   }


}catch(error){
    console.log(error);
    res.json({success:false, message:"Error updating user"})
}
}

//user email
const updateEmail = async (req,res)=>{
  try{
  
     const token = req.cookies.token || ""
     const userId = await auth(token)
    await userModel.findByIdAndUpdate(userId, {email:req.body.email})
  
     res.json({success:true, message:"Email updated!"})
  
  }catch(error){
      console.log(error);
      res.json({success:false, message:"Error updating user"})
  }
  }
  

//user password


//userProfile pic
const updateProfilePic = async (req,res)=>{
  try{
  
     const token = req.cookies.token || ""
     const userId = await auth(token)
     const user = await userModel.findOne({_id:userId})

     if(user.profilePic){
      await deleteFromCloudinary(user.publicKey)
     }

    if(req.file){
      const result = await   AddToCloudinary(req.file)
      await userModel.findByIdAndUpdate(userId, { profilePic:result.secure_url, publicKey:result.public_id})
      res.json({success:true, message:"Profile Picture updated!"})
    }else{
      await userModel.findByIdAndUpdate(userId, { profilePic:"", publicKey:""})
      res.json({success:true, message:"Profile Picture removed!"})
    }
  
  }catch(error){
      console.log(error);
      res.json({success:false, message:error})
  }
  }

 
  

module.exports = {updateUserName, updateEmail, updateProfilePic}