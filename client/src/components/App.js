import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Login from "./login"
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {

  return (
     <div>
          <Router>
          <AuthProvider>
            <Switch>
             <Route exact path="/" component={Dashboard}/>
             <Route path="/signup" component={Signup} />
             <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
          </Router>
        </div>
  );
}

export default App;
