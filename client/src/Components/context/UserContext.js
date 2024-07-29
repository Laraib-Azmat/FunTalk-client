import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client"
import { setOnlineUser } from "../../redux/userSlice";

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [openAddFriend, setOpenAddFriend] = useState(false);
   const dispatch = useDispatch()
   const[socketConnection, setSocketConnection] = useState(null)
   URL=window.location.origin
  //socket connection
  useEffect(()=>{
    const socketConnection = io(window.location.origin,{
      auth:{
        token:localStorage.getItem("token")
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
