import React, { Component } from 'react';
import axios from 'axios';

import ConstantsList from './Common';

class Left extends Component {
	state = {
		user: {
			_json: {}
		}
	}
	constructor() {
		super();
		let userTwitterId = ConstantsList.getParameterByName("twitterId", window.location.href);
		ConstantsList.setToken("twitterId", userTwitterId);
	}

	componentDidMount() {
		let me = this;
		let twitterId = ConstantsList.getToken("twitterId");
		axios.get(ConstantsList.BASE_URL+'/user/getDetailsByTwitterId?twitterId='+twitterId)
		  .then(function (response) {
		  	ConstantsList.setToken("token", response.data.data.token);
		  	ConstantsList.setToken("tokenSecret", response.data.data.tokenSecret);
		    me.setState({
		    	user: response.data.data
		    });
		  })
		  .catch(function (error) {
		    console.log(error);
		});
	}


	render() {
		return (
				<div className="box box-primary">
	            	<div className="box-body box-profile">
	              		<div className="text-center">
	                		<img className="profile-user-img img-responsive img-circle" src="twitterpluslogo.png" alt="User profile picture" />
	              		</div>
	              		<h3 className="profile-username text-center">{this.state.user.displayName}</h3>
	              		<p className="text-muted text-center">{this.state.user.username}</p>
	              		<ul className="list-group list-group-unbordered">
			                <li className="list-group-item">
			                  <b>Followers</b>
			                  <a className="pull-right">{this.state.user._json.followers_count}</a>
			                </li>
			                <li className="list-group-item">
			                  <b>Following</b>
			                  <a className="pull-right">{this.state.user._json.favourites_count}</a>
			                </li>
			                <li className="list-group-item">
			                  <b>Friends</b>
			                  <a className="pull-right">{this.state.user._json.friends_count}</a>
			                </li>
			              </ul>
	            	</div>
	          	</div>
			);
	}
}

export default Left;

