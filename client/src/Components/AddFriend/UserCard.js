import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { useSelector } from 'react-redux'

const UserCard = ({user}) => {
  
  const {setOpenAddFriend} = useContext(UserContext)
  const onlineuser = useSelector(state=>state.user.onlineUser)
 const isActive = onlineuser.includes(user._id)
  return (
    <Link onClick={()=>setOpenAddFriend(false)} to={"/"+user._id}  className='flex items-center bg-[#AC7D88] p-2 rounded-lg shadow-lg cursor-pointer border-pink-300 hover:border-2'>

        <div className=' relative w-10 h-10 sm:w-20 sm:h-20 bg-white rounded-full mr-5 items-center flex justify-center '>
            {user.profilePic ?
        <img src={user.profilePic} alt='profile' className='w-full h-full object-cover rounded-full' />:
        <p className='text-4xl font-mono font-bold text-red-900'> {user.name[0]} </p>    
        }
        {isActive ? <div className='bg-green-500 w-2 h-2 sm:w-4 sm:h-4 absolute top-0 sm:left-2 left-0 rounded-full'></div> :''}
        </div>
        <div className=' flex flex-col text-md sm:text-lg font-poppins  line-clamp-1 ' >
            <p className=' overflow-x-hidden   text-ellipsis  text-white'>{user.name}</p>
            <p className='overflow-x-hidden text-ellipsis text-sm sm:text-lg'>{user.email}</p>
        </div>
    </Link>
  )
}

export default UserCard