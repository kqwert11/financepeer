import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'


import React, { Component } from 'react'
import { Login, Signup } from '../containers'
import './beforeLogin.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class beforeLogin extends Component {

  render() {
	  return (
	  	<Router>

	      <div className="App">
	        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
	          <div className="container">
	            <Link className="navbar-brand" to={"/"}>FinancePeer</Link>
	            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
	              <ul className="navbar-nav ml-auto">
	                <li className="nav-item">
	                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
  	                </li>
  	              </ul>
	            </div>
	          </div>
	        </nav>

	        <div className="auth-wrapper">
	          <div className="auth-inner">
	            <Switch>
	              <Route exact path='/' component={Login} />
	              <Route path="/sign-in" component={Login} />
	            </Switch>
	          </div>
	        </div>
	      </div>

	  	</Router>
	  );
  }
}

export default beforeLogin;






