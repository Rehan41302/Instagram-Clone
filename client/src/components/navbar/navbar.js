import React from 'react';
import {Link } from "react-router-dom";
import "./navbar.css"

function Navbar(){
    return(
        
            <nav>
                <div className="nav-wrapper white">
                <Link to="/" className="brand-logo left">Instagram.pk</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/user/profile">Profile</Link></li>
                </ul>
                </div>
            </nav>
       
    )
}

export default Navbar;