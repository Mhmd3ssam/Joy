import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import CreateService from '../pages/CreateService/CreateService';
import Hotels from './ServicesCards/Hotels';
import Restaurants from './ServicesCards/Restaurants';
import RentService from './ServicesCards/RentService';
import EditeItem from './ServicesCards/EditeItem';
import Offer from './ServicesCards/Offer';
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
            <Route exact path="/offer" component={Offer}/>
        </Switch>
    )
}

export default Routes
