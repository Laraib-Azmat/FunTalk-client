import App from "../../App";
import Message from "../Message/Message";
import ForgotPassword from "../Pages/ForgotPassword";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import {createBrowserRouter} from "react-router-dom"
import Profile from "../Profile/Profile";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children : [
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                    path:"profile",
                    element:<Profile/>
            },
            {
                path:"",
                element:<Home/>,
                children:[
                    {
                        path:":userId",
                        element:<Message/>
                    }
                ]
            }
        ]
    }
])

export default router