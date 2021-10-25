import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Login from "./login"
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
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
             <Route path="/signup" component={Signup} />
             <Route path="/login" component={Login} />
             <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
          </Router>
        </div>
  );
}

export default App;
