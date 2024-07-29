import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {toast} from "react-toastify"
import { setUser } from '../../redux/userSlice';

const Data = () => {
  const user = useSelector(state => state.user);
  const [showDelete, setShowDelete] = useState(!!user.profilePic);
  const dispatch = useDispatch();

  

  const handleFileChange = async (e) => {
  
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', file);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/updatePic`
    const response = await axios.post(url,formData,{withCredentials:true})
   if(response.data.success){
    toast.success(response.data.message)
    dispatch(setUser({_id:user._id,name:user.name,email:user.email,profilePic:URL.createObjectURL(file),token:user.token}))
   }else{
    toast.error(response.data.message)
   }
   
  };

  const handleDelete =async () => {

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/updatePic`
    const response = await axios.post(url,{},{withCredentials:true})
   if(response.data.success){
    toast.success(response.data.message)
    dispatch(setUser({_id:user._id,name:user.name,email:user.email,profilePic:"",token:user.token}))
   }else{
    toast.error(response.data.message)
   }

    setShowDelete(false);

  };



  return (
    <div className="group before:hover:scale-95 before:hover:h-80 sm:before:hover:w-80 before:hover:w-[85vw] before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] sm:before:w-80 before:w-[85vw] before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-pink-300 before:absolute before:top-0 w-[85vw] sm:w-80 h-80 relative bg-blue-200 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
      <div className=" w-28 h-28 bg-blue-200 mt-8 items-center justify-center flex rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 relative">
        {user.profilePic ? (
          <>
            <img src={user.profilePic} alt='profilePic' className="w-full h-full rounded-full object-cover" />
            <button onClick={handleDelete} className="absolute w-8 h-8 bottom-0 right-0 bg-red-600 text-white rounded-full p-1">
              ✖
            </button>
          </>
        ) : (
          <p className='text-4xl font-bold text-red-900'>{user.name[0]}</p>
        )}
      </div>
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
        <span className="text-2xl font-semibold">{user.name}</span>
        <p>{user.email}</p>
      </div>
      <label className="bg-red-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-pink-500 cursor-pointer">
        Change
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
}

export default Data;
