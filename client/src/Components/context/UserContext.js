import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client"
import { setOnlineUser } from "../../redux/userSlice";

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [openAddFriend, setOpenAddFriend] = useState(false);
   const dispatch = useDispatch()
   const[socketConnection, setSocketConnection] = useState(null)

  //socket connection
  useEffect(()=>{
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
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
    <UserContext.Provider value={{ openAddFriend, setOpenAddFriend, socketConnection }}>
      {children}
    </UserContext.Provider>
  );
};
