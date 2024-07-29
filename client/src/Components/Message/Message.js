import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate, useParams} from "react-router-dom"
import VideosIcon from "../../assets/VideosIcon.png"
import PhotosIcon from "../../assets/PhotosIcon.png"
import AddIcon from "../../assets/AddIcon.png"
import sendIcon from "../../assets/sendIcon.png"
import crossIcon from "../../assets/crossIcon.png"
import { ClipLoader } from 'react-spinners'
import UploadFile from '../helper/UploadFile'
import Text from './Text'
import {toast} from "react-toastify"
import { UserContext } from '../context/UserContext'

const Message = () => {

  const [openOption, setOpetion] = useState(false)
  const params = useParams()
  const user = useSelector(state=>state.user)
  const {socketConnection} = useContext(UserContext)
  const [userData, setUserData] = useState({
    name:"", email:"",profilePic:"",online:false
  })
  const [messageText, setMessageText] = useState("")
  const [loading, setLoading] = useState(false)
  const [openImageVedioField, setOpenImageVideo] = useState(false)
  const [image, setImage] = useState()
  const [video, setVideo] = useState()
  const [allMessages, setAllMessages] = useState([])
  const currentMsg = useRef()
  const navigate = useNavigate()
  

  useEffect(()=>{
   if(currentMsg.current){
     currentMsg.current.scrollIntoView({behavior:"smooth", block:"end"})
   }
  },[allMessages])

  useEffect(()=>{
    if(socketConnection){
      socketConnection.emit("message-page", params.userId)

      socketConnection.emit('seen', params.userId)

      socketConnection.on("message-error",data=>{
       if(data){
        navigate("/")
        toast.error(data?.message)
       
       }
      })
      socketConnection.on("message-user",(data)=>{
        setUserData(data)
      })

      socketConnection.on('message',(data)=>{
          setAllMessages(data)
      })
    }
  },[socketConnection,params?.userId,user, allMessages])
 
  const handleUplaodImage = async (e)=>{
    setLoading(true)
    const file = e.target.files[0]
    setImage(file)
      setOpenImageVideo(true)
      setOpetion(false)
      setLoading(false)
  }

  const handleUploadVideo = async (e)=>{
    setLoading(true)
    const file = e.target.files[0]
    setVideo(file)
      setOpenImageVideo(true)
      setOpetion(false)
      setLoading(false)
  }

  const handleCloseImageVedio = ()=>{
    setOpenImageVideo(false)
    setMessageText("")
    setImage("")
    setVideo("")
  }

 const uploadCloudinary = async ()=>{
  setLoading(true)
  if(image){  
    const response = await UploadFile(image)
    console.log("video response: ",response);
    setLoading(false)
    return response
  
  }else if(video){
    const response = await UploadFile(video)
    setLoading(false)
    return response
  }else{
    setLoading(false) 
    return null
  }

 }
  const sendMessageHandler = async (e)=>{
    e.preventDefault()

    let  imgResult;
    let videoResult;
    const result = await uploadCloudinary()

    if(image){
      imgResult=result
    }if(video){
      videoResult=result
      console.log("verio result: ",videoResult);
    }

    if(result ||  messageText){

      if(socketConnection){
        socketConnection.emit("new-message",{
            sender: user._id,
            receiver: params.userId,
            text:messageText,
            image: imgResult? imgResult.secure_url: "",
            video:videoResult?videoResult.secure_url:"",
            publicKey:result?result.public_id:"",
            msgBy:user._id
        })
        setMessageText("")
        setImage("")
        setVideo("")
      
       }
    }
 

  }

 return (
     <div className='h-full w-full '>
                <header className='  sticky top-0  h-20 bg-[#A25772] flex border-none md:border-l-2 items-center p-4 w-screen lg:w-full'>
      <div className=' w-16 h-16 bg-white rounded-full mr-5 items-center flex justify-center '>

            {userData.profilePic ?
        <img src={userData.profilePic} alt='profile' className='w-full h-full object-cover rounded-full' />:
        <p className=' text-4xl font-mono font-bold text-red-900'>{userData.name[0]}</p>    
        }
        </div>

        <div className='flex items-center flex-col '>
          <p className='text-xl font-poppins font-semibold text-white' > {userData.name} </p>
          <p className='text-lg '>{userData.online ? <span className='text-green-300'>Online</span>:<span className='text-yellow-300'>Offline</span>}</p>
        </div>
    </header>

    <div className=' relative  bg-[#fff] w-screen lg:w-full top-0 overflow-y-auto scrollbar h-[calc(100vh-128px)] '  >
      
     <div ref={currentMsg}  className='flex flex-col gap-5 p-4 pb-12 '>
     {allMessages.map((msg,i)=>{
       return <Text key={i} msg={msg} user={user._id} />
      })}

     </div>


            {/* Handle Upload IMage Container */}

         {openImageVedioField && image && (
             <div className=' sticky bottom-0 w-full h-[85vh] bg-slate-800 bg-opacity-40 rounded overflow-hidden flex justify-center items-center '>
             <div className='absolute top-4 right-2 cursor-pointer hover:scale-105' onClick={handleCloseImageVedio}>
                 <img src={crossIcon} alt='cross' />
             </div>

             <div className='bg-white p-3'>
               <img
               src={URL.createObjectURL(image)}
                   alt='uploaded Image'
                    className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
               />
             </div>

           </div>
         )}


            {/* Handle Upload Vedio Container */}

           {openImageVedioField && video &&(
             <div className=' sticky bottom-0   w-full h-[85vh] bg-slate-800 bg-opacity-40 rounded overflow-hidden flex justify-center items-center '>
             <div className='absolute top-4 right-2 cursor-pointer hover:scale-105' onClick={handleCloseImageVedio}>
                 <img src={crossIcon} alt='cross' />
             </div>

             <div className='bg-white p-3'>
  <video
    src={URL.createObjectURL(video)}
    alt='uploaded Video'
    className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
    controls
    muted
    onError={(e) => console.log('Error loading video:', e)}
  />
</div>

           </div>
           )}

           {loading && (
            <div className=' sticky bottom-0 w-full h-[85vh] bg-slate-800 bg-opacity-40 rounded overflow-hidden flex justify-center items-center' >
                  <ClipLoader color='white' size={80}  />
              </div>
           )}

   
    </div>

        <form onSubmit={sendMessageHandler} className='fixed bottom-0  bg-[#A25772] h-20 w-full border-none md:border-l-2  flex items-center'>

        <div className='w-12 h-12 ml-4 cursor-pointer relative '> 
            <img src={AddIcon} alt='plus-icon' onClick={()=>setOpetion(!openOption)} />
            {openOption ?
            <div onSubmit={()=>sendMessageHandler()} className='absolute w-40 h-30 bottom-10 bg-green-300 p-4 shadow-lg rounded-md'>
            <label htmlFor='imageInput' className='flex items-center justify-center w-full gap-3  cursor-pointer hover:bg-blue-200 p-1'>
              <img src={PhotosIcon} alt='photos' className='w-10 h-10'/>
              <p className='font-poppins '>Photos</p>
            </label>
            <label htmlFor='vedioInput' className='flex items-center justify-center w-full gap-3 cursor-pointer hover:bg-blue-200 p-1'>
              <img src={VideosIcon} alt='videos' className='w-10 h-10'/>
              <p className='font-poppins '>Videos</p>
            </label>
            <input type='file' id='imageInput' onChange={handleUplaodImage}  accept='image/*' hidden />
            <input type='file' id='vedioInput' onChange={handleUploadVideo}  accept='video/*'  hidden />
          </div>:<></>}
        </div>
              <div className='flex  ml-2 items-center justify-between w-[100%] lg:w-[55%] '>
                <input type='text' placeholder='Type message...' className='w-full p-3 focus:outline-none mx-2 font-poppins' value={messageText}  onChange={(e)=>setMessageText(e.target.value)} />
                <button type='submit' className='m-3 '>
                  <img src={sendIcon} alt='send' />
                </button>
              </div>

                 
     

        </form>


     </div>
  )
}

export default Message