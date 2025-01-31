import React, { useContext, useEffect, useState } from 'react'
import Wave from '../UI/Wave'
import { useDispatch, useSelector } from 'react-redux'
import profileImg from "../../assets/profilePic.png"
import Data from './Data'
import editIcon from "../../assets/editIcon.svg"
import Model from '../UI/Model'
import crossIcon from "../../assets/crossIcon.png"
import axios from "axios"
import {toast} from "react-toastify"
import { setUser,logout } from '../../redux/userSlice'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const user = useSelector(state=>state.user)
    const [eiditVisible, setEditVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [editState, setEditState] = useState("")
   const [newText, setNewText] = useState("")
   const [deletePassword, setdeletePassword]= useState("")
   const dispatch = useDispatch()
    const navigate = useNavigate()
   const {URL} = useContext(UserContext)

   const handleInputChange = (e) => {
    setNewText(e.target.value);
  };

  //name-email update
  const updateUsername = async ()=>{
    if(newText && newText!==user.name && newText!==user.email){
     try{
      let response;
      if (editState==="name"){
      const url = `${URL}/api/user/updateName`
       response = await axios.post(url,{name:newText},{withCredentials:true})
    }
      else{
        const url = `${URL}/api/user/updateEmail`
         response = await axios.post(url,{email:newText},{withCredentials:true})
      }
      if(response.data.success){
        toast.success(response.data.message)
        if(editState==="name"){
          dispatch(setUser({_id:user._id,name:newText,email:user.email,profilePic:user.profilePic,token:user.token}))
        }else{
          dispatch(setUser({_id:user._id,name:user.name,email:newText,profilePic:user.profilePic,token:user.token}))
        }
       
        setNewText("")
        setEditVisible(false)
      }else{
        toast.error(response.data.message)
        setNewText("")
        setEditVisible(false)
      }
    
     }catch(error){
      console.log(error);
      toast.error("Something went wrong...")
     }
    }else{
      toast("Try any other text")
      setNewText("")
      setEditVisible(false)
    }
  }

  //logout if token not match
  const logoutHandler = async ()=>{
    const url = `${URL}/api/user/logout`
    const response = await axios.get(url)
    
    if (response){
      dispatch(logout())
      localStorage.removeItem('token')
      navigate("/register")
    }
  }

  //Delete Account Permanently
  const deleteAccountHandler=async ()=>{
    if(deletePassword!==""){

      try{
         const url = `${URL}/api/user/delete-account`;
         const response = await axios.post(url, {password:deletePassword}, {withCredentials:true})

         if(response.data.success){
          dispatch(logout())
          localStorage.removeItem('token')
          navigate("/register")
          toast.success("User Deleted Succesfully")
          setDeleteVisible(false)
          setdeletePassword("")

         }else if(response.data.logout){
            logoutHandler()
            setdeletePassword("")
         }else{
          toast.error(response.data.message)
          setDeleteVisible(false)
          setdeletePassword("")
         }

      }catch(error){
        console.log(error);
        toast.error("Something went wrong...")
      }

    }else{
      toast.error("Write some text")
    }
  }

  //get user when the page reload
  const fetchUserDetails = async ()=>{
    try{
      const url = `${URL}/api/user/user-details`
      const response = await axios.get(url,{withCredentials:true})
      if(response.data.logout){
        logoutHandler()
      }
      if(response.data.success){

        dispatch(setUser(response.data.data))
      }else{
        dispatch(logout())
        logoutHandler()
      }

    }catch(error){
      console.log(error);
      logoutHandler()
      
    }
  }

  useEffect(()=>{
          fetchUserDetails()
  },[])

  return (

    <div className=' mt-5 md:mt-10 w-full  flex flex-col items-center gap-7 md:gap-20 overflow-x-hidden overflow-y-auto h-[90vh] scrollbar '>


<h2 className='font-poppins font-bold text-3xl text-red-900 '>My Profile</h2>

  <div className='flex gap-7 md:gap-20 z-30 flex-col md:flex-row   '> 

            <Data />
 
     <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-purple-200 via-pink-400 to-red-700 rounded-full blur-sm mix-blend-multiply filter  bg-opacity-70 animate-pulse"></div>
     <div className="absolute bottom-0 z-10 left-0 w-40 h-40 bg-gradient-to-r from-green-300 via-blue-500 to-purple-700 rounded-full blur-sm mix-blend-multiply filter  bg-opacity-70 animate-pulse delay-100"></div>
 

   <div className='bg-pink-200 flex flex-col  w-[85vw] z-30  sm:w-80 md:h-80 rounded-2xl p-4 self-center md:self-end gap-5  '>
    
    <div className='flex bg-blue-200 p-4 w-full justify-between rounded-lg'>
        <p className='font-poppins'>{user.name}</p>
        <img className='w-10 h-8 cursor-pointer hover:scale-110 ' src={editIcon} alt='edit' onClick={()=>{setEditVisible(true); setEditState("name");setNewText(user.name)}} />
    </div>

    <div className='flex bg-blue-200 p-4 w-full justify-between rounded-lg'>
        <p className='font-poppins line-clamp-1'>{user.email}</p>
        <img  className='w-10 h-8 cursor-pointer hover:scale-110 ' src={editIcon} alt='edit' onClick={()=>{setEditVisible(true); setEditState("email");setNewText(user.email)}}  />
    </div>

    <div className='flex flex-col items-center gap-5  '>
        <button className='bg-green-700 p-2 rounded-e-lg text-white font-mono font-semibold'  >Change Password</button>
        <button className='bg-red-400 p-2 rounded-e-lg text-white font-mono font-semibold ' onClick={()=>setDeleteVisible(true)} >Delete Account</button>
    </div>
    
    </div>
    </div>  

  

   <img src={profileImg} className='absolute right-0 bottom-0 z-10 w-[30%] h-[30%] ' />

    <Wave/>


      <Model isOpen={eiditVisible} onClose={()=>setEditVisible(false)} >

      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
          <div className="p-4 flex justify-between items-center">
            <h2 className=" font-semibold text-red-900 font-mono text-2xl">Change {editState}</h2>
            <button onClick={()=>{setEditVisible(false);setNewText("")}} className="text-gray-500 hover:text-gray-700">
              <img src={crossIcon} alt='cross'/>
            </button>
          </div>
          <div className="p-4">
            <input type='text' value={newText}  onChange={handleInputChange} className='bg-pink-200 p-4 font-poppins rounded-md w-full' autoFocus  />
          </div>
          <div className="p-4 border-t flex justify-end gap-5">
            <button
              onClick={()=>{setEditVisible(false);setNewText("")}}
              className="px-4 py-2 bg-red-500  text-white rounded hover:bg-red-600 transition font-mono"
            >
              Close
            </button>
            <button onClick={updateUsername} className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600 transition font-mono">
                Update
            </button>
          </div>
        </div>

      </Model>

      {/* Delete User Model */}

      <Model isOpen={deleteVisible} onClose={()=>setDeleteVisible(false)} >

      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
          <div className="p-4 flex justify-between items-center">
            <h2 className=" font-semibold text-red-900 font-mono text-2xl">Delete Account</h2>
            <button onClick={()=>{setDeleteVisible(false);setdeletePassword("")}} className="text-gray-500 hover:text-gray-700">
              <img src={crossIcon} alt='cross'/>
            </button>
          </div>
          <div className="px-6">
            <p className='bg-pink-200 p-2 font-poppins rounded-md w-full'>{user.email}</p> 
          </div>
          <div className="px-6 py-4">
            <input type='text' value={deletePassword}  onChange={(e)=>setdeletePassword(e.target.value)} className='bg-pink-200 p-2 font-poppins rounded-md w-full to-black' autoFocus placeholder='Write Password' />
          </div>
          <div className="p-4 border-t flex justify-end gap-5">
            <button
              onClick={()=>{setDeleteVisible(false);setdeletePassword("")}}
              className="px-4 py-2 bg-red-500  text-white rounded hover:bg-red-600 transition font-mono"
            >
              Close
            </button>
            <button onClick={deleteAccountHandler} className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600 transition font-mono">
              Delete Permanently
            </button>
          </div>
        </div>

      </Model>


   </div>

  )
}

export default Profile