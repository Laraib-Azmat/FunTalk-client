const  userModel = require("../models/userModel")

async function searchUser(req, res){
    try{

        const {searchText} = req.body
        const query = new RegExp(searchText,"i","g")

        const user = await userModel.find({
            "$or":[
                {name:query},
                {email:query},
            ]
        }).select("-password")

        res.json({success:true, data:user})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message||error})
    }
}


module.exports = searchUser