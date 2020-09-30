import React, { Component } from "react";


export default class Orginazation extends Component {
    constructor(props) {
        super(props);
        this.state = { companyname:'',address:'',phonenumber:'',email: ''}
      }
    
      mySubmitHandler = (event) => {
        event.preventDefault();
        //var username = this.state.username;
        //var password = this.state.password;
        //alert("You are submitting " + username + ' and ' + password);
        fetch("./organization", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( this.state ),
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
        this.setState({companyname: event.target.value});
      };
    
      myChangeHandler2 = (event) => {
        this.setState({address: event.target.value});
      };
      myChangeHandler3 = (event) => {
        this.setState({phonenumber: event.target.value});
      };
      myChangeHandler4 = (event) => {
        this.setState({email: event.target.value});
      };

    render() {
        return (
            
            <form onSubmit={this.mySubmitHandler}>
                <h3>Orginazation Registration</h3>

                <div className="form-group">
                    <label>company name</label>
                    <input type="text" className="form-control" onChange={this.myChangeHandler} />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="address" className="form-control" onChange={this.myChangeHandler2} />
                </div>

                <div className="form-group">
                    <label>phone number</label>
                    <input type="phonenumber" className="form-control" onChange={this.myChangeHandler3} />
                </div>

                <div className="form-group">
                    <label>email</label>
                    <input type="email" className="form-control" onChange={this.myChangeHandler4} />
                </div>

                <input type='submit'/>
                
            </form>
        );
    }
}