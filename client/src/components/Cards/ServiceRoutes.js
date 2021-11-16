import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Restaurants from './Restaurants';
import Hotels from './Hotels';
import ServiceCards from './ServiceCards';

function ServiceRoutes() {
    return (
        <Router>
            <Switch>
            <Route  exact path="/hotels" component={Hotels} />
            <Route exact path="/restaurants" component={Restaurants} />
            <Route exact path="/Service" component={ServiceCards}/>
            </Switch>
        </Router>

    )
}

export default ServiceRoutes;
