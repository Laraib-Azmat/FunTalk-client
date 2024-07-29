const auth = require("../middleWare/auth");
const userModel = require("../models/userModel");

 
 const userDetails = async (token)=>{
try{

    const userId = await auth(token)
    if(userId.logout){
        return null
      }else{
        const user = await userModel.findById(userId).select('-password')

        return user
      }


}catch(error){
    console.log(error);
    return null
}
 }

 module.exports = userDetails