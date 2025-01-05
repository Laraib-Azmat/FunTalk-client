import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client"
import { setOnlineUser } from "../../redux/userSlice";

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {

  const [openAddFriend, setOpenAddFriend] = useState(false);
   const dispatch = useDispatch()
      const URL="https://fun-talk-backend.vercel.app"

   //socket connection for real-time messages
   const[socketConnection, setSocketConnection] = useState(null)

  //socket connection
  useEffect(()=>{
      //Token from local storage
 const token = localStorage.getItem("token");
    const socketConnection = io(URL,{
      auth:{
        token:token
      }
    })

    socketConnection.on("onlineUser",(data)=>{
      dispatch(setOnlineUser(data))
    })

    setSocketConnection(socketConnection)

    return ()=>socketConnection.disconnect()
  },[dispatch])

  return (
    <UserContext.Provider value={{ openAddFriend, setOpenAddFriend, socketConnection, URL }}>
      {children}
    </UserContext.Provider>
  );
};
