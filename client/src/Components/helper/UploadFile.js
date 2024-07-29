const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_Name}/auto/upload`

const UploadFile = async(file) => {
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset","chat-app-file")

    const response = await fetch(url,{
        method : 'post',
        body : formData
    })

    
    const responseData = await response.json()
    console.log("form data  ",responseData);

    return responseData
}

export default UploadFile
