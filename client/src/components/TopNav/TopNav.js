import React, {useState, useEffect} from "react";
import "./topnav.css";
import Dropdown from '../Dropdown/Dropdown';
import notifications from '../../assets/JsonData/notification.json';
import { Link } from "react-router-dom";
import user_image from '../../assets/images/girlavatar.jpg'
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../Firebase";
import {useHistory } from "react-router-dom";







const renderUserToggle = (user) => (
  <Link to="/profile">
      <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
  </Link>

)





function TopNav() {

const [error, setError] = useState("");
const[user,setUser] = useState(null)
const {logout, getUser} = useAuth();
const history = useHistory();



useEffect(() => {
  getUser('UserProvider',auth.currentUser.email)
  .then((data)=>{
    setUser(data)

  })
}, [])

console.log(user)


const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item" >
            <i className={item.icon}></i>
            <span >{item.content}</span>
        </div>
    </Link>
)

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
  </div>
)
function goToProfile(){
  history.push('./profile')
}
const curr_user = {
  display_name: user ?user.englishUserName:"" ,
  image:user? user.imagePath:'',
}

  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>

      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
      </div>
    </div>
  );
}

export default TopNav;
