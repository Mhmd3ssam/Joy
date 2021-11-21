import React,{useState} from "react"
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../Firebase";
import {useHistory } from "react-router-dom";

function useSidebar(){
    const {logout} = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();


    async function handleLogout() {
        setError("");
        try {
          await logout(auth)
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }
    
    const sidebar_items = [
        {
            "display_name": "Home",
            "route": "/layout",
            "icon": React.createElement('img',{
              src:"https://img.icons8.com/plasticine/100/000000/home.png",
              width:35
            
            })
        },
        {
            "display_name": "profile",
            "route": "/profile",
            "icon": React.createElement('img',{
                src:"https://img.icons8.com/office/80/000000/user-male-circle.png",
                width:30
            })
        },
    
        {
            "display_name": "Create Service",
            "route": "/layout/create",
            "icon": React.createElement('img',{
                src:"https://img.icons8.com/office/80/000000/create-new.png",
                width:30,
            })
        },
        {
            "display_name": "Hotels",
            "route": "/hotels",
            "icon": React.createElement('img',{
                src:"https://img.icons8.com/external-linector-flat-linector/64/000000/external-hotel-hotel-service-linector-flat-linector.png",
                width:30
              
            })
        },
        {
            "display_name": "Rent",
            "route": "/rent",
            "icon": React.createElement('img',{
                src:"https://img.icons8.com/plasticine/100/000000/city-buildings.png",
                width:35
              
            })
        },
        {
            "display_name": "Restaurants",
            "route": "/restaurants",
            "icon": React.createElement('img',{
                src:"https://img.icons8.com/external-linector-flat-linector/64/000000/external-restaurant-new-normal-linector-flat-linector.png",
                width:35
              
            })
        },
        {
            "display_name": "Logout",
            "route": "/",
            "icon":  React.createElement('img',{
                src:"https://img.icons8.com/external-sbts2018-lineal-color-sbts2018/58/000000/external-logout-social-media-sbts2018-lineal-color-sbts2018.png",
                width:35 
            }),
            "click":handleLogout,
        },
    ]
    
    return sidebar_items
}


export  default useSidebar;

