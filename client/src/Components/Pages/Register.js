import React, { useContext, useState } from 'react'
import Wave from '../UI/Wave'
import person from "../../assets/person.svg"
import cactus from "../../assets/cactus.svg"
import '@fortawesome/fontawesome-free/css/all.min.css';
import chatIcon from "../../assets/chatIcon.ico"
import Button from '../UI/Button';
import SwitchBtn from '../UI/SwitchBtn';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {ClipLoader} from "react-spinners"
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/userSlice';
import { UserContext } from '../context/UserContext';

function Register() {

    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        profilePic:""
    })
    const [profilePicture, setProfilePicture] = useState(null);
    const [state, setState] = useState("Login")
    const [loading, setLoading] = useState(false)
    const {URL} = useContext(UserContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChangeData = (e)=>{
       const name = e.target.name
       const value = e.target.value

        setData((prev)=>({...prev, [name]:value}))
    }

    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfilePicture(reader.result);
           
          }
          reader.readAsDataURL(file);       
          setData(prev=>({...prev, profilePic:file}))      
          
        }
    }

      const submitHandler = async (e)=>{

        e.preventDefault();
       setLoading(true)

       const formData = new FormData()
       formData.append("name",data.name)
       formData.append("email", data.email)
       formData.append("password",data.password)
       formData.append("profilePic",data.profilePic)
       
      const action = state==="Login"?"login":"register";
       const url = `${URL}/api/user/${action}`
     
    
      const response = await axios.post(url, formData,{withCredentials:true})
      
       if(response.data.success){
        dispatch(setToken(response.data.token))
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.token)
        navigate("/")
        setData({
          name:"",
          email:"",
          password:"",
          profilePic:""
      })
      setLoading(false)
       }else{
        toast.error(response.data.message)
        setData({
          name:"",
          email:"",
          password:"",
          profilePic:""
      })
      setLoading(false)
       }
    
      }
    
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-100 overflow-hidden">
        <Wave/>
    <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-200 via-pink-400 to-red-700 rounded-full blur-sm mix-blend-multiply filter  opacity-70 animate-pulse"></div>
    <div className="absolute top-32 right-16 w-40 h-40 bg-gradient-to-r from-green-300 via-blue-500 to-purple-700 rounded-full blur-sm mix-blend-multiply filter  opacity-70 animate-pulse delay-100"></div>
    <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-yellow-300 via-orange-500 to-red-700 rounded-full blur-sm mix-blend-multiply filter  opacity-70 animate-pulse delay-300"></div>

  <div className='flex items-center justify-center ' >

    {/* left div */}

    <div className='flex h-96 mr-[-120px]'>
        <img src={cactus} alt='cactus' className=' self-end mr-[-100px] z-20 '  />
        <img src={person} alt='person'  />
    </div>

 {/* Right div */}  

<div className='flex flex-col relative '>
<div className=' relative ' > 
<h2 className='flex items-center gap-2 mb-3 font-roboto text-md font-bold  '>
    <img src={chatIcon} alt='icon' style={{width:'10%', height:"10%", objectFit:"cover"}} />
    FunTalk</h2>

    
{state!=="Login" &&
    <div className="absolute top-[30%] right-5 z-10 w-24 h-24 mx-auto rounded-full overflow-hidden bg-blue-100">
          {profilePicture ? (
            <img
              id="profile-picture-preview"
              className="w-full h-full object-cover"
              src={profilePicture}
              alt="Profile Picture"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#A12347]">
              <i className="fas fa-user fa-3x"></i>
            </div>
          )}
          <input
            id="profile-picture-input"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>}
</div>


<div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-start gap-8">

      <h1 className="text-2xl font-bold font-poppins ">{state}</h1>
      <form className='bg-[#FFDFD6] p-4 rounded-lg shadow-lg w-full max-w-md  ' onSubmit={(e)=>submitHandler(e)}>
        {state!=="Login" && <input type="text" placeholder="Name" required name='name' onChange={(e)=>onChangeData(e)} value={data.name} className="w-full my-4 px-4 py-2 focus:outline-none focus:border-transparent border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-200" />}
        <input type="email" placeholder="Email" name='email' required onChange={(e)=>onChangeData(e)} value={data.email} className="w-full px-4 py-2 my-4 border border-gray-300 focus:outline-none focus:border-transparent  rounded-md focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-200" />
        <input type="password" placeholder="Password" autoComplete='true' required name='password' onChange={(e)=>onChangeData(e)} value={data.password} className="w-full px-4 py-2 my-4 border border-gray-300 rounded-md focus:outline-none focus:border-transparent  focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-200" />
        {state==="Login" &&<Link to="/forgot-password"> <p  className=' underline text-right font-mono font-semibold cursor-pointer hover:text-neutral-600 '>Forgot Password?</p></Link>}
        <Button type="submit">{loading?<ClipLoader color="#36d7b7" size={20} />:state}</Button>
      </form>
  {state==='Login'?
    <p className='flex items-center  gap-3 font-poppins'>Don't have an account? <SwitchBtn onClick={()=>setState("Signup")} >Signup</SwitchBtn></p>
:
<p className='flex items-center  gap-3 font-poppins'>Already have an account? <SwitchBtn onClick={()=>setState("Login")} >Login</SwitchBtn></p>
}
    </div>
</div>

  </div>

  </div>
  )
}

export default Register