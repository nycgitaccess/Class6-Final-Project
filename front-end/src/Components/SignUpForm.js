import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      mobilenumber: '',
      dateofbirth: '',
      gender: '',
      open: false,
      hasagreed: false
    };

  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      username, 
      password, 
      firstname, 
      lastname, 
      email, 
      mobilenumber, 
      dateofbirth, 
      gender 
   
    } = this.state;
      
      const user = {
        username,
        password, 
        firstname, 
        lastname, 
        email, 
        mobilenumber, 
        dateofbirth, 
        gender
      }
 console.log(user);
 this.signup(user).then(()=> {
  this.setState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    mobilenumber: '',
    dateofbirth: '',
    gender: '',
    open: true,
    hasagreed: false
   })
 })
  }

    signup = user =>{
       return fetch('http://localhost:3001/users/signup', {
       method: "post",
       headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body:JSON.stringify(user)
   })
   .then(response =>{
     return response.json()
   })
   .catch(err => console.log(err));
  }

  render() {
    const {username, 
           password, 
           firstname, 
           lastname, 
           email, 
           mobilenumber, 
           dateofbirth, 
           gender,
           open,
           hasagreed} = this.state
    return (
      <div className="Sign_up">

        <div style={{display: open? "" : 'none', 
        color: "blue"}}>{open}
        You are successefully created your acount. Please sign in.
        </div>

        <form onSubmit={this.handleSubmit} className="SignUp_Form">
        
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">User Name:</label>
            <input type="text" id="userName" className="FormField__Input"
              placeholder="Enter your user name" name="username"
              value={username} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Password:</label>
            <input type="password" id="password" className="FormField__Input"
              placeholder="Enter your password" name="password"
              value={password} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Firt Name:</label>
            <input type="text" id="firstName" className="FormField__Input"
              placeholder="Enter your first name" name="firstname"
              value={firstname} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Last Name:</label>
            <input type="text" id="lastName" className="FormField__Input"
              placeholder="Enter your last name" name="lastname"
              value={lastname} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">E-Mail Address:</label>
            <input type="email" id="email" className="FormField__Input"
              placeholder="Enter your email" name="email"
              value={email} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Mobile Number:</label>
            <input type="number" id="mobileNumber" className="FormField__Input"
              placeholder="Enter your mobile number" name="mobilenumber"
              value={mobilenumber} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Date of Birth:</label>
            <input type="date" id="dateOfBirth" className="FormField__Input"
              placeholder="Enter your birth day" name="dateofbirth"
              value={dateofbirth} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Gender:</label>
            <input type="text" id="gender" className="FormField__Input"
              placeholder="Enter your gender" name="gender"
              value={gender} onChange={this.handleChange} />
          </div>
          
          <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input className="FormField__Checkbox" type="checkbox" name="hasagreed"
                value={hasagreed} onChange={this.handleChange} /> I agree all statements in
                    <Link to="/" className="FormField__TermsLink">terms of service</Link>
            </label>
          </div>

          <div className="FormField">
            <button className="Sign-Up-button" onClick={this.handleSubmit}>Sign Up</button>
            <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;