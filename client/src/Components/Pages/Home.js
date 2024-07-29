import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../SideBar/Sidebar'
import Welcome from './Welcome'
import Friends from '../AddFriend/Friends'
import { UserContext } from '../context/UserContext'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { logout, setUser } from '../../redux/userSlice'

function Home() {
 
  const {openAddFriend} = useContext(UserContext)
  const location = useLocation()
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const basePath = location.pathname === '/'
  
  const logoutHandler = async ()=>{
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`
    const response = await axios.get(url,{withCredentials:true})
    if (response){
      dispatch(logout())
      localStorage.removeItem('token')
      navigate("/register")
    }
  }

  const fetchUserDetails = async ()=>{
    try{
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/user-details`
      const response = await axios.get(url,{
        withCredentials:true})

      if(response.data.logout){
        logoutHandler()
      }
      if(response.data.success){

        dispatch(setUser(response.data.data))
      }else{
        dispatch(logout())
      }

    }catch(error){
      console.log(error);
      
    }
  }

  useEffect(()=>{
          fetchUserDetails()

  },[])

  return (
    <div className=' grid lg:grid-cols-[400px,1fr] md:grid-cols-[300px,1fr] grid-cols-[1fr]  h-screen  max-h-screen ' >
     <section className={`bg-[#6D2932] ${!basePath && "hidden"} lg:block`} >
     <Sidebar/>
     </section>

     {location.pathname==="/"? 
     <section className='md:block hidden'>
    <Welcome/>     </section>:
      <Outlet/>}
 

    {openAddFriend &&    <Friends />}

    
    </div>
  )
}

export default Home