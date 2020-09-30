import React, { Component } from 'react';






  class Checkin extends Component {
    constructor(props) {
      super(props);
      this.state = { locationID: '' }
      // this.state={email:'',password:''}
    }
    // mySubmitHandler=(event)=>{
    //   event.preventDefault();
    //   var email=this.state.email;
    //   var password=this.state.password;
    //   alert=('you havent login!')
    // }
  
    mySubmitHandler = (event) => {
      event.preventDefault();
      //var username = this.state.username;
      //var password = this.state.password;
      //alert("You are submitting " + username + ' and ' + password);
      fetch("./checkIn", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( this.state ),
      })

      .then(response => response.json())  
      .then(data => {
        console.log(data)
        if (data.status === '200') {
          this.props.history.push("/checkinSubmit");
        }
        else { alert('invalid locationID, please try again')
         }
      })
    .catch((error) => {
    console.error('Error:', error);
    })
  }
  
    myChangeHandler = (event) => {
      this.setState({locationID: event.target.value});
    };
    
  
  render() {
    // window.state = '';
    if (window.state != 'loggedIn') {
      alert('you have not login yet')
    }
   
    return (

         
         <form onSubmit={this.mySubmitHandler} >


          
            <h1 style={{color:'blue'}}>please enter your location ID</h1>
            <div className="form-group"> 
           <label>LOcation ID</label>
            <input type="number" className="form-control"  onChange={this.myChangeHandler} />
            

            </div>
            <input
        type='submit'
      />
        </form>
   
    );
  }
}

export default Checkin;