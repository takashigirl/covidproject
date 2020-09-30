import React,{Component} from "react";
import {  Link } from "react-router-dom";




window.state = '';

export default class landing extends Component {
    render() {
        return (
            
            <div class="jumbotron jumbotron-fluid">
        <div class='container-2'>
        <h1 class='display-4'>welcome to covid19-tracker</h1>

      
            
      <Link to='/registration'><button type="button" class="btn btn-warning btn-lg btn-block">Sign Up</button></Link><br/>
      <Link to='/sign-in'><button type="button" class="btn btn-warning btn-lg btn-block">Sign In</button></Link><br/>
      <Link to='/Organization'><button type="button" class="btn btn-warning btn-lg btn-block">Organization Register</button></Link>

       </div>
         </div>
    );
}
}
