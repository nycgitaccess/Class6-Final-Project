import React from 'react';
import { Link } from "react-router-dom";

const Mainback = () => (
    <div className="main-page">
        <div className='log-in'>
            <h1 className="loginHeader">myAthens</h1>
            <h2 className="loginH2">dive now into heart of the city...</h2>
        </div>

        <div className="signGoogle">
            <h2 id='signGoogle1'>log in or</h2>
            <h2 id='signGoogle2'>sign in with Google</h2>
            <Link to="/sign-in">
                <img className='Google' src='https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png' alt="2_img" width='35px' />
            </Link>
        </div>
        <div className="account">
            <h2 id="accountH21">new in town?!</h2>
            <h2 id='accountH2'>create your <br></br>account <strong>now!</strong></h2>
            <Link to="/sign-up">
                <img className='Arrow' src='https://cdn1.iconfinder.com/data/icons/apple-watch-bold-line-4/70/200-512.png' alt="1_img" width='50px' />
            </Link>
        </div>
    </div>
)

export default Mainback;