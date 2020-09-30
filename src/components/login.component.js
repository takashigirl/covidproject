import React, { Component } from "react";
//import { useHistory} from "react-router-dom";

export default class Login extends Component {

  
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
  }


  mySubmitHandler = (event) => {
    event.preventDefault();
    //var username = this.state.username;
    //var password = this.state.password;
    //alert("You are submitting " + username + ' and ' + password);
    fetch("./login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status === '200') {
          const cookieString = "email=" + this.state.email + "; expires=" + this.getCookieExpiryTime(2);
          console.log('cookieString', cookieString);
          document.cookie = cookieString;
          console.log('document.cookie', document.cookie);
          window.state = 'loggedIn';
          this.props.history.push("/checkin");
        }
        else {
          alert('wrong username or password, please try again')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  getCookieExpiryTime(validHours) {
    const timeNow = new Date();
    timeNow.setHours(timeNow.getHours() + validHours);
    return timeNow.toUTCString();
  }
  myChangeHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  myChangeHandler2 = (event) => {
    this.setState({ password: event.target.value });
  };


  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" onChange={this.myChangeHandler} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" onChange={this.myChangeHandler2} />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
          </div>
        </div>
        <div className='form-group'>

          <input type="submit" />

        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}
