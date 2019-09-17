import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      redirect : false
    };

  }

  handleChange= (e) => {
    const target = e.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


    authenticate(jwt, next){
     if (typeof window!== 'undefined'){
       localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
       } 

    }
    handleSubmit = (event) => {
      event.preventDefault();
      const {email, password } = this.state;
        
        const user = {
          email, 
          password, 
        }
  //  console.log(user);

   this.signin(user).then(data =>{
    this.authenticate(data, ()=>this.setState({
      redirect : true
    }));

   });
  }
   
signin = user => {
  return fetch('http://localhost:3001/users/signin', {
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
     .catch(err => console.log(err))  
    }
  
  render() {
    const {email, password, redirect} = this.state

    if (redirect) {
      return < Redirect to ="/profile" />
    }
    return (
      <div className="Sign_in">
        <form onSubmit={this.handleSubmit} className="SignIn_Form" onSubmit={this.handleSubmit}>
          <div className="FormField_in">
            <label className="label-email" htmlFor="email"><strong>User Name or E-Mail Address:</strong></label>
            <input type="email" id="email" className="FieldIn-email"
              placeholder="Enter your email" name="email"
              value={email} onChange={this.handleChange} />
          </div>

          <div className="FormField_in">
            <label className="label-pass" htmlFor="password"><strong>Password:</strong></label>
            <input type="password" id="password" className="FieldIn-pass"
              placeholder="Enter your password" name="password"
              value={password} onChange={this.handleChange} />
          </div>

          <div className="FormField_in">
            <button className="Sign-In-button" onClick = {this.handleSubmit} >Sign In</button>
            <Link to="/sign-up" className="FormField-link-in">Create an account</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
