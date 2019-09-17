import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpForm from './Components/SignUpForm';
import SignInForm from './Components/SignInForm';
import Main from "./Components/Main";
import NavBar from "./Components/navbar";
import Profile from "./Components/profile";

import './App.css';

class App extends Component {
  render() {
    return (
  
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/location" component={Main}></Route>
          <Route exact path="/sign-up" component={SignUpForm}></Route>
          <Route exact path="/sign-in" component={SignInForm}></Route>
          <Route exact path="/profile" component={Profile}></Route>
        </Switch>
      </Router>
         );
  }
}

export default App;
