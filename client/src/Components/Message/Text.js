import React from 'react'
import Moment from 'react-moment';
const Text = ({msg,user}) => {
    
   
    if(msg.msgBy===user){
        return (
            <div className='w-fit p-2 bg-red-300 self-end rounded-bl-3xl pl-4 max-w-[280px]   md:max-w-sm lg:max-w-md '>
                <div className='w-full '>
                    {msg?.imageUrl &&(
                        <img  src={msg?.imageUrl} alt='image' className='w-full h-full object-scale-down max-h-[280px]   md:max-h-sm lg:max-h-md mb-3' />
                    )}
                </div>
                <div className='w-full'>
                    {msg?.vedioUrl &&(
                        <video src={msg?.vedioUrl} alt='vedio' className='w-full h-full object-scale-down ' controls />
                    )}
                </div>
                <p className='font-poppins text-lg break-words '> {msg.text} </p>
              <div className='flex justify-between items-center gap-5'>
              <p className='font-mono text-end text-white text-xs'> <Moment format="hh:mm A">{msg.createdAt}</Moment></p>
              <p className={`rounded-full w-5 h-5 text-sm flex justify-center items-center ${msg.seen?'text-red-900 bg-blue-300':'text-gray-600 bg-white '}`}><i class="fa-solid fa-check"></i></p>
              </div>
            </div>
          )
    }else{
        return (
            <div className='w-fit p-2 bg-[#F5C6EC] rounded-tr-3xl pr-4  max-w-[280px]   md:max-w-sm lg:max-w-md'>
                   <div className='w-full'>
                    {msg?.imageUrl &&(
                        <img  src={msg?.imageUrl} alt='image' className='w-full h-full object-scale-down max-h-[280px]   md:max-h-sm lg:max-h-md mb-3' />
                    )}
                </div>
                <div className='w-full'>
                    {msg?.vedioUrl &&(
                        <video src={msg?.vedioUrl} alt='vedio' className='w-full h-full object-scale-down ' controls />
                    )}
                </div>
                <p className='font-poppins text-lg break-words'> {msg.text} </p>
                <p className='font-mono text-start text-[#9A208C] text-sm'> <Moment format="hh:mm A">{msg.createdAt}</Moment></p>
            </div>
          )
    }
}

export default Text