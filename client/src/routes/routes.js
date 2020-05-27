import React from 'react';
import {BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Home from "../components/home/home";
import Login from '../components/navbar/login/login';
import Profile from '../components/navbar/profile/profile';
import SignUp from '../components/navbar/signup/signup';

function Routing(){
    return(
        <>
            <Router>
                <Navbar/>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/user/profile' component={Profile}/>
                <Route exact path='/signup' component={SignUp}/>
            </Router>
        </>

    )
}

export default Routing;