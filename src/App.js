import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
// import SignUp from "./components/signup.component";
import Landing from "./components/landing.component";
import Organization from './components/organization.component';
import Sucess from './components/Sucess.Component';
import Checkin from './components/checkin.component';
import Registration from './components/registration.component';

import CheckinSubmit from './components/checkinSubmit.component';

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <Link className="navbar-brand" to={"/"}>covid19-tracker</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/registration"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/organization"}>Organization</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path="/sign-in" component={Login} />
            {/* <Route path="/sign-up" component={SignUp} /> */}
            <Route path="/organization" component={Organization}/>
            <Route path="/Sucess" component={Sucess}/>
            <Route path="/Checkin" component={Checkin}/>
            <Route path="/Registration" component={Registration}/>
            <Route path="/CheckinSubmit" component={CheckinSubmit}/>
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
