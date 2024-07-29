import React, { useContext, useState } from 'react'
import logoutIcon from "../../assets/LogoutIcon.gif"
import frndIcon from "../../assets/frndIcon.gif"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from "axios"
import { logout } from '../../redux/userSlice'
import { toast } from 'react-toastify'

const Options = () => {

    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const { setOpenAddFriend} = useContext(UserContext)
    const dispatch = useDispatch()

    const logoutHandler = async ()=>{

       const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`
        const response = await axios.get(url,{withCredentials:true})
        if(response.data.success){
          dispatch(logout())
          localStorage.removeItem('token')
          toast.success("Logout Successfull")
          navigate("/register")
        }else{
          toast.error("Something went wrong")
        }
    }


  return (
<div className='flex py-6 justify-center items-center gap-10 bg-[#A25772] h-20 sticky bottom-0'>
<section className="flex justify-center items-center">
  <button
       onClick={()=>navigate("/profile")}
    className="group flex justify-center rounded-md drop-shadow-xl bg-[#fff] from-gray-800 to-black text-white  hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] "
  >
    
   {user.profilePic ? 
    <img
    src={user.profilePic} 
    alt="Friends Icon"
    className="w-10 h-10 rounded-lg"
  />:
  <p className='w-10 h-10 p text-2xl text-[#310413] font-mono font-bold flex items-center justify-center bg-blue-200 rounded-md hover:rounded-full'>{user.name[0]}</p>
  }
    <span
      className="absolute opacity-0 group-hover:opacity-100 group-hover:text-[#fff] font-semibold group-hover:text-md group-hover:-translate-y-7 duration-700"
    >
     Profile
    </span>
  </button>
</section>

<section className="flex justify-center items-center">
  <button
    onClick={()=>setOpenAddFriend(true)}
    className="group flex justify-center  rounded-md drop-shadow-xl bg-[#fff] from-gray-800 to-black text-white  hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
  >
    
    <img
      src={frndIcon} 
      alt="Friends Icon"
      className="w-10 h-10 rounded-lg"
    />
    <span
      className="absolute opacity-0 group-hover:opacity-100 group-hover:text-[#fff] font-semibold group-hover:text-md group-hover:-translate-y-7 duration-700"
    >
     Friend
    </span>
  </button>
</section>

<section className="flex justify-center items-center">
  <button
    onClick={logoutHandler}
    className="group flex justify-center  rounded-md drop-shadow-xl bg-blue-400  from-gray-800 to-black text-white  hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
  >
    
    <img
      src={logoutIcon} 
      alt="Friends Icon"
      className="w-10 h-10"
    />
    <span
      className="absolute opacity-0 group-hover:opacity-100 group-hover:text-[#fff] font-semibold group-hover:text-md group-hover:-translate-y-7 duration-700"
    >
      Logout
    </span>
  </button>
</section>

</div>

  
  )
}

export default Options