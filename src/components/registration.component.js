import React, { Component } from 'react';


class registration extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '', address: '', phonenumber: '', }
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    fetch("./registration", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Cookie' : document.cookie
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);

      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  myChangeHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  myChangeHandler1 = (event) => {
    this.setState({ email: event.target.value });
  };

  myChangeHandler2 = (event) => {
    this.setState({ password: event.target.value });
  };

  myChangeHandler3 = (event) => {
    this.setState({ address: event.target.value });
  };

  myChangeHandler4 = (event) => {
    this.setState({ phonenumber: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h1>please enter your details </h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type='text'
            className='form-control'
            onChange={this.myChangeHandler}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            onChange={this.myChangeHandler1}
          />
        </div>

        <div className="form-group">
          <label>password:</label>
          <input
            type='password'
            className='form-control'
            onChange={this.myChangeHandler2}
          />
        </div><div className="form-group">
          <label>Address</label>
          <input
            type='address'
            className='form-control'
            onChange={this.myChangeHandler3}
          />
        </div>

        <div className="form-group">
          <label>phone number</label>
          <input
            type='text'
            className='form-control'
            onChange={this.myChangeHandler4}
          />
        </div>


        <input type='submit' />
      </form>
    );
  }
};


export default registration;