import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import CreateService from '../pages/CreateService/CreateService';
import Hotels from './Cards/Hotels';
import Restaurants from './Cards/Restaurants';
import RentService from './Cards/RentService';
import EditeItem from './Cards/EditeItem';
function Routes() {
    return (
        <Switch>
            <Route exact path="/layout/services" component={Dashboard} />
            <Route exact path="/layout" component={HomePage} />
            <Route exact path="/layout/create" component={CreateService} /> 
            <Route  exact path="/hotels" component={Hotels} />
            <Route exact path="/restaurants" component={Restaurants} />
            <Route exact path="/rent" component={RentService}/>
            <Route exact path="/editItem" component={EditeItem}/>
        </Switch>
    )
}

export default Routes
