

const logoutUser = async (req,res)=>{
try{
    const cookieOption ={
        http:true,
        secure:true
    }
        return res.cookie("token",'',cookieOption).status(200).json({
            success:true, message:"session out"
        })
}catch(error){
    console.log(error)
    res.json({success:false, message:"Error while logging out"})
}

}

module.exports = logoutUser