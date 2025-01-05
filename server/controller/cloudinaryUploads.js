const cloudinary = require("../config/cloudinary")

//adding image to cloudinary
const AddToCloudinary = async (file)=>{
    const result =   await cloudinary.uploader.upload(file.path,{
        folder: 'chat_app_file',
    });

    return result
}

// delete from cloudinary
const deleteFromCloudinary = async (public_id)=>{
    const result = await cloudinary.uploader.destroy(public_id);
    return result
}

module.exports = {AddToCloudinary, deleteFromCloudinary}