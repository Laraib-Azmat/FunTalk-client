import React, { useContext } from 'react'
import WelcomeImage from "../../assets/WelcomeImg1.png"
import plantImg from "../../assets/Plant.png"
import helloImg from "../../assets/helloImg.png"
import { useSelector } from 'react-redux'
import {TypeAnimation} from "react-type-animation"
import Button from '../UI/Button'
import { UserContext } from '../context/UserContext'

const Welcome = () => {

    const user = useSelector(state=>state.user)
    const {setOpenAddFriend} = useContext(UserContext)

    
  return (
    <div className=" min-h-screen flex items-center justify-center bg-blue-200 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-blue-200 via-pink-200 to-purple-300 animate-pulse"></div>
    
    <h2 className='z-20 absolute top-20 font-poppins font-semibold text-fuchsia-800 text-md md:text-lg lg:text-xl'>Welcome to FunTalk! Lets chat with someone</h2>
   <div className='z-20 flex w-full justify-between mt-10 '>

    <div className='flex flex-col items-center  w-1/2 gap-10 xl:justify-start justify-center '>

            <TypeAnimation 
            sequence={[
                `Hello ${user.name}`,2000,
                "Welcome to FunTalk",2000,
                "Lets start chatting",2000
            ]}
            wrapper='span'
            speed={30}
            className='font-sans font-bold text-md md:text-lg lg:text-xl md:pl-10 lg:pl-5 text-red-900 '
            repeat={Infinity}
        />
           
       <div className='lg:w-60 lg:h-60 lg:relative xl:block hidden'>
       <img src={plantImg} alt='plant' className='w-[100%] h-[50%] object-contain  absolute bottom-0 right-20 z-[-10] '  />
      <img className='w-[100%] h-[100%]  object-contain block  ' src={helloImg}  />
       </div>

       <Button onClick={()=>setOpenAddFriend(true)}><p className='lg:text-lg md:text-md font-roboto'>Explore friends</p></Button>
    </div>

    <div className='flex items-center lg:h-[50vh] h-[30vh] self-end '>
            <img src={WelcomeImage} alt='image person' className='w-[100%] h-[100%]  object-contain '  />
            <img src={plantImg} alt='plant' className='w-[100%] h-[50%] object-contain '  />
    </div>

   </div>
  </div>
  )
}

export default Welcome