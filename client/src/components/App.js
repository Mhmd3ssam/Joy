import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
//import Components
import Login from "./login"
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ContactUs from "./ContactUs/ContactUs";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import Layout from "./layout/Layout";

//import style and icons files
import '../assets/boxicons-2.0.7/css/boxicons.min.css'
import '../assets/css/grid.css'
import '../assets/css/theme.css'
import '../assets/css/index.css'

import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {

  return (
     <div>
          <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="/layout" component={Layout} />
             <Route path="/signup" component={Signup} />
             <Route path="/login" component={Login} />
             <Route path="/forgot-password" component={ForgotPassword} />
             <Route path="/contact" component={ContactUs} />
            </Switch>
          </AuthProvider>
          </Router>
        </div>
  );
}

export default App;
