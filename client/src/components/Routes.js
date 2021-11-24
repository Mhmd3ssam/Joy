import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
//import CreateService from '../pages/CreateService/CreateService';
import Hotels from '../pages/Hotels/Hotels';
import Restaurants from '../pages/Restaurants/Restaurants';
import Rent from '../pages/Rent/Rent';
import EditeItem from './ServicesCards/EditeItem';
import Offer from './ServicesCards/Offer';
import Profile from '../pages/Profile';
import EditeProfile from '../pages/EditeProfile';
import Servicesdetails from '../pages/ServiceDetails/Servicesdetails';
import CreateHotelServices from '../pages/CreateService/CreateHotelServices';
import CreateRentServices from '../pages/CreateService/CreateRentServices';
import CreatRestaurantseService from '../pages/CreateService/CreateService';
function Routes() {
    return (
        <Switch>
            <Route exact path="/layout/services" component={Dashboard} />
            <Route exact path="/layout" component={HomePage} />
            <Route exact path="/restaurantservices" component={CreatRestaurantseService} /> 
            <Route  exact path="/hotels" component={Hotels} />
            <Route exact path="/restaurants" component={Restaurants} />
            <Route exact path="/rent" component={Rent}/>
            <Route exact path="/editItem" component={EditeItem}/>
            <Route exact path="/offer" component={Offer}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/editeprofile" component={EditeProfile}/>
            <Route exact path="/details" component={Servicesdetails}/>
            <Route exact path="/hotelservices" component={CreateHotelServices}/>
            <Route exact path="/rentservices" component={CreateRentServices}/>
        </Switch>
    )
}

export default Routes
