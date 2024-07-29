import React, { useContext, useEffect, useState } from 'react'
import searchIcon from "../../assets/searchIcon.png"
import crossIcon from "../../assets/crossIcon.png"
import {ClipLoader} from "react-spinners"
import UserCard from './UserCard'
import {toast} from "react-toastify"
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useSelector } from 'react-redux'

const Friends = () => {

    const [searchUser, setSearchUser] = useState([])
    const [loading , setLoading ] = useState(false)
    const [searchText, setSearchText] = useState("")
    const {setOpenAddFriend, URL} = useContext(UserContext)
    const user = useSelector(state=>state.user)

    const searchUserHandler = async ()=>{
      try{
        setLoading(true)
    const url = `${URL}/api/user/searchUser`

    const response = await axios.post(url,{searchText})
    if(response.data.success){
      setSearchUser(response.data.data)
      setLoading(false)
    }else{
      setLoading(false)
      toast.error(response.data.message)
    }

      }catch(error){
        setLoading(false)
        toast.error(error.response.data.message)
      }
    }

    useEffect(()=>{
      searchUserHandler()
    },[searchText])



  return (
    <div className=' fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-60 z-40 flex items-center justify-center flex-col '>
         <div className='flex justify-between items-center bg-[#AC7D88] py-2  w-full max-w-xl'>
                <img src={crossIcon} alt='cross' className='cursor-pointer' onClick={()=>setOpenAddFriend(false)}  />
                <div className='flex items-center w-full  bg-white mr-5  '>
                <input type='text' placeholder='Search by name,email...' className='w-full p-4 border-none focus:outline-none' value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
                <img src={searchIcon} alt='search' className='w-10 h-10 mr-3' />
                </div>
        </div>
       <div className=' w-full max-w-xl  bg-white h-[60%] flex p-1 sm:p-4 justify-center overflow-y-auto scrollbar  '>
 

            {loading && <ClipLoader color='red' /> }
            {(searchUser.length<=0 && !loading )&& (<p className='text-lg font-poppins '>No user Found!</p>)}

            {!loading&&searchUser.length>0 &&
            <div className='flex flex-col  gap-5 w-full p-4'>
                {searchUser.map((dispuUser,i)=>{
                  if(dispuUser?._id !== user?._id)
                  {  return <UserCard key={i} user={dispuUser} />}
                })}
                </div>
            }   
        
        </div>
        
       </div>

  )
}

export default Friends