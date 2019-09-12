import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      password: '',
      firstNmae: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      dateOfBirth: '',
      gender: '',
      createdAt: '',
      updatedAt: '',
      hasAgreed: false
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
      <div className="Sign_up">
        <form onSubmit={this.handleSubmit} className="SignUp_Form">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">User Name:</label>
            <input type="text" id="userName" className="FormField__Input"
              placeholder="Enter your user name" name="user name"
              value={this.state.userName} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Password:</label>
            <input type="password" id="password" className="FormField__Input"
              placeholder="Enter your password" name="password"
              value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Firt Name:</label>
            <input type="text" id="firstName" className="FormField__Input"
              placeholder="Enter your first name" name="first name"
              value={this.state.firstName} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Last Name:</label>
            <input type="text" id="lastName" className="FormField__Input"
              placeholder="Enter your last name" name="last name"
              value={this.state.lastName} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">E-Mail Address:</label>
            <input type="email" id="email" className="FormField__Input"
              placeholder="Enter your email" name="email"
              value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Mobile Number:</label>
            <input type="number" id="mobileNumber" className="FormField__Input"
              placeholder="Enter your mobile number" name="mobileNumber"
              value={this.state.mobileNumber} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Date of Birth:</label>
            <input type="date" id="dateOfBirth" className="FormField__Input"
              placeholder="Enter your birth day" name="dateOfBirth"
              value={this.state.dateOfBirth} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Gender:</label>
            <input type="text" id="gender" className="FormField__Input"
              placeholder="Enter your gender" name="gender"
              value={this.state.gender} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Create:</label>
            <input type="date" id="create" className="FormField__Input"
              placeholder="create time" name="create"
              value={this.state.createdAt} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Update:</label>
            <input type="date" id="ubdate" className="FormField__Input"
              placeholder="update time" name="update"
              value={this.state.updatedAt} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input className="FormField__Checkbox" type="checkbox" name="hasAgreed"
                value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in
                    <Link to="/" className="FormField__TermsLink">terms of service</Link>
            </label>
          </div>

          <div className="FormField">
            <button className="Sign-Up-button">Sign Up</button>
            <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;