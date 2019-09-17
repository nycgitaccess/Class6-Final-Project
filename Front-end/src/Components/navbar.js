import React from 'react';
import {Link, withRouter } from 'react-router-dom';


const isActive = (history, path) =>{
            if(history.location.pathname === path) return {color: "#ff9900" } 
    else return {color: "#fffff"}
}

   export  const signout = (next) =>{
    if(typeof window!== "undefined")
    localStorage.removeItem("jwt");
    next();
    return fetch("http://localhost:3001/users/signout", {
        method: "GET"
    })
    .then(response =>{
        console.log("signout", response);
        return response.json();
    })
    .catch(err => console.log(err))
}

const NavBar = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                    <Link
                     className = "nav-link" 
                     style={isActive(history, "/")} 
                     to = "/">
                        Home
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link 
                    className = "nav-link" 
                    style={isActive(history, "/location")} 
                    to ="/location">
                        FindMe
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link 
                    className = "nav-link" 
                    style={isActive(history, "/sign-up")} 
                    to ="/sign-up">
                        signup
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link 
                    className = "nav-link" 
                    style={isActive(history, "/sign-in")} 
                    to ="/sign-in">
                        signin
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link 
                    className = "nav-link" 
                    style={isActive(history, "/profile")}
                    to ="/profile">
                        profile
                        </Link>
                    </li>
                    <li className="nav-item">
                    <a 
                    className = "nav-link" 
                    style={isActive(history, "/profile")}
                    onClick ={() =>history.push("/")}>
                        sign out
                    </a>
                    </li>
            </ul>
    </div>
)
   

export default withRouter(NavBar)

