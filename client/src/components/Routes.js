import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import CreateService from '../pages/CreateService/CreateService';


function Routes() {
    return (
        <Switch>
            <Route exact path="/layout/services" component={Dashboard} />
            <Route exact path="/layout" component={HomePage} />
             <Route exact path="/layout/create" component={CreateService} /> 
        </Switch>
    )
}

export default Routes
