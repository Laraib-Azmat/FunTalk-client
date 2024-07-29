import React, { useContext, useEffect, useState } from 'react'
import Options from './Options'
import Button from '../UI/Button'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import imgLogo from "../../assets/imgLogo.png"
import vedioLogo from "../../assets/VideosIcon.png"
import { NavLink } from 'react-router-dom'
import helloImg from "../../assets/helloImg.png"
import { UserContext } from '../context/UserContext'

const Sidebar = () => {
  const [allUsers, setAllUsers] = useState([])
  const user = useSelector(state => state?.user)
  const [loading, setLoading] = useState(false)
  const {setOpenAddFriend, socketConnection} = useContext(UserContext)

  useEffect(() => {
    if (socketConnection) {
  
      setLoading(true)
      socketConnection.emit('sidebar', user._id)
      socketConnection.on('conversation', (data) => {
        const displayUser = data.map((convUser, i) => {
          if (convUser.sender?._id === convUser.receiver?._id) {
            return {
              ...convUser,
              userDetail: convUser.sender
            }
          } else if (convUser.receiver._id !== user._id) {
            return {
              ...convUser,
              userDetail: convUser.receiver
            }
          } else {
            return {
              ...convUser,
              userDetail: convUser.sender
            }
          }
        })
        setAllUsers(displayUser)
      })
      setLoading(false)
    }
  }, [socketConnection, user])

  return (
    <div className='flex flex-col h-full overflow-hidden'>
      <div className='flex-shrink-0 bg-[#A25772] p-4 text-2xl font-bold font-poppins text-white text-start h-20'>
        Friends
      </div>
      <div className='flex-grow overflow-y-auto scrollbar h-60 overflow-x-hidden'>
        {allUsers.length <= 0 ? (
          <div className='flex items-center h-full w-full justify-center p-4 gap-5'>
            <div className='flex flex-col gap-5 items-center w-full '>
            <p className='text-center text-md  sm:text-xl text-white '>No Friends yet! <br /> Why not make some new friends</p>      
            <div onClick={()=>setOpenAddFriend(true)} className='block md:hidden'><Button>Explore Friends</Button></div>
          </div>
          <img src={helloImg} alt='image' className='w-48 block md:hidden' />
            </div>
        ) : (
          <div className='flex flex-col gap-5 py-10 px-6'>
            {loading && <ClipLoader color='purple' className='mt-10' />}
            {allUsers.map((convuser, i) => (
           
              <NavLink to={"/"+convuser.userDetail?._id} key={i} className='bg-white p-2 rounded-xl shadow-lg flex items-center justify-between cursor-pointer hover:bg-green-100'>
                <div className='relative w-16 h-16 bg-[#E4C2C1] rounded-full flex justify-center items-center shadow-2xl'>
                  {convuser.userDetail?.profilePic ? (
                    <img src={convuser.userDetail?.profilePic} alt='profile' className='w-full h-full object-cover rounded-full' />
                  ) : (
                    <p className='text-4xl font-mono font-bold text-red-900'> {convuser.userDetail?.name[0]} </p>
                  )}
                </div>

                <div className='ml-4 flex-1 overflow-x-hidden'>
                  <p className='text-red-900 font-poppins font-semibold'>{convuser.userDetail?.name}</p>
                  {convuser.lastMsg.imageUrl &&(
                    <div className='flex items-center '>
                      <img src={imgLogo} alt='image' className='w-5 h-5 object-scale-down' />
                      <p className=' text-sm text-ellipsis overflow-x-hidden w-full line-clamp-1'>{convuser.lastMsg.text?convuser.lastMsg.text:'Image'}</p>
                      </div>
                  )}
                   {convuser.lastMsg.vedioUrl &&(
                    <div className='flex items-center gap-1'>
                      <img src={vedioLogo} alt='video' className='w-5 h-5 object-scale-down' />
                      <p className=' text-sm text-ellipsis overflow-x-hidden w-full line-clamp-1'>{convuser.lastMsg.text?convuser.lastMsg.text:'Video'}</p>
                      </div>
                  )}
                  {(!convuser.lastMsg.imageUrl && !convuser.lastMsg.vedioUrl)&&(
                    <p className=' text-sm text-ellipsis  overflow-x-hidden line-clamp-1'>{convuser.lastMsg.text}</p>
                  )}
                </div>
             
               {Boolean(convuser.unseenMsg )&& (
                 <div className='bg-green-600 w-5 h-5 self-center ml-5 mr-2 rounded-full text-xs text-white flex items-center justify-center p-2'>
                 {convuser.unseenMsg}
               </div>
               )}
              </NavLink>
            ))}

       
          </div>
        )}
      </div>
      <div className='flex-shrink-0'>
        <Options />
      </div>
    </div>
  )
}

export default Sidebar
