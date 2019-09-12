import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(this.state);
  }

  render() {
    return (
      <div className="Sign_in">
        <form onSubmit={this.handleSubmit} className="SignIn_Form" onSubmit={this.handleSubmit}>
          <div className="FormField_in">
            <label className="label-email" htmlFor="email"><strong>User Name or E-Mail Address:</strong></label>
            <input type="email" id="email" className="FieldIn-email"
              placeholder="Enter your email" name="email"
              value={this.state.email} onChange={this.handleChange} />
          </div>

          <div className="FormField_in">
            <label className="label-pass" htmlFor="password"><strong>Password:</strong></label>
            <input type="password" id="password" className="FieldIn-pass"
              placeholder="Enter your password" name="password"
              value={this.state.password} onChange={this.handleChange} />
          </div>

          <div className="FormField_in">
            <button className="Sign-In-button">Sign In</button>
            <Link to="/sign-up" className="FormField-link-in">Create an account</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
