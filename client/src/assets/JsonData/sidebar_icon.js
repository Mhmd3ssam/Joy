import React from "react"
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
  
]

export  default sidebar_items;

