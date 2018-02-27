import React, { Component } from 'react';

import ConstantsList from './Common';

class Login extends Component {

	clickLogIn = () => {
	    window.location.href = ConstantsList.BASE_URL+"/auth/login/twitter";
	  }

	render() {
    	return (
        	<div className="App">
	        	<div className="text-center">
		          <div className="form-signin">
		            <img src="twitterpluslogo.png" className="App-logo" alt="logo" />
		            <h1 className="h3 mb-3 font-weight-normal">Welcome to TwitterPluz</h1>
		            <button className="btn btn-lg btn-primary" onClick={this.clickLogIn.bind(this)}>Sign in with Twitter</button>
		            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
		          </div>
		        </div>
		    </div>
    	);
  	}
}

export default Login;

