import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';

function Routes() {
    return (
        <Switch>
            <Route exact path="/layout/services" component={Dashboard} />
            <Route exact path="/users" component={Users} />

        </Switch>
    )
}

export default Routes
