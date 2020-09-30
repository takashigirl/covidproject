import React,{Component} from "react";
import moment from 'moment';



export default class checkinSubmit extends Component {

    constructor(props) {
        super(props);
        this.state = { locationID: '',date:'',time:'' }
        // this.state={email:'',password:''}

      }

      mySubmitHandler = (event) => {
        event.preventDefault();
        //var username = this.state.username;
        //var password = this.state.password;
        //alert("You are submitting " + username + ' and ' + password);
        fetch("./checkinsubimit", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( this.state ),
        })
  
        .then(response => response.json())  
        .then(data => {
          console.log('success',data)
        //   if (data.status === '200') {
        //     this.props.history.push("/checkinSubmit");
        //   }
        //   else { alert('invalid locationID, please try again')
        //    }
        })
      .catch((error) => {
      console.error('Error:', error);
      })
    }
    
      myChangeHandler = (event) => {
        this.setState({locationID: event.target.value});
      };
    render() {


        var CurrentDateTwo = moment().format('MMMM Do YYYY, h:mm:ss a');
        return (
   
        
    
        <div>
            
        <h1 className='checkintext'>you have checked in locationID on {CurrentDateTwo}</h1>
      
        <p className='date'>{CurrentDateTwo}</p>
        <p>{this.state.locationID}</p>

         </div>
    );
}
}

