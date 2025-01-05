const jwt = require("jsonwebtoken")

const auth = async (token)=>{

    if(!token){
        return {
            message:"session out, login again",
            logout:true
        }
    }

    const decode =  jwt.verify(token, process.env.JWT_SECRET_KEY)
 return  userId= decode.id
    
}

module.exports = auth