import React, { Component } from "react";
import {  Link } from "react-router-dom";



export default class SignUp extends Component {
    render() {
        return (
              <form >
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter Email" />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="address" className="form-control" placeholder="Address" />
                </div>
                <div className="form-group">
                    <label>Phone number</label>
                    <input type="number" className="form-control" placeholder="Number" />
                </div>  
                
                <div className="password">
                    <label>Enter Password</label>
                    <input type="password" className="form-control validate" placeholder="Enter password" />
                </div>

                

                <Link to='/Sucess'> <button type="submit" className="btn btn-primary btn-block">Sign Up</button></Link>

                <p className="forgot-password text-right">
                    Already registered <a href="/Sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}