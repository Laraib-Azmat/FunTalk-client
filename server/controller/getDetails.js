const userDetails = require("./userDetails");


const getDetails = async (req,res)=>{

      try{
        const token = req.cookies.token || ""
        const user = await userDetails(token)
        if(user){
          res.json({success:true, data:user})
        }else{
          res.json({success:false, logout:true,message:"session out"})
        }
    
      }catch(error){
        console.log(error);
        res.json({success:false,logout:true, message:error.message||error,})
    }

}

module.exports = getDetails