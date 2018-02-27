import React, { Component } from 'react';
import axios from 'axios';

import ConstantsList from './Common';

class Center extends Component {
	state = {
		timeline: []
	}
	tweetMessage = "";
	constructor() {
		super();
		if (!ConstantsList.getToken("twitterId")) {
			let userTwitterId = ConstantsList.getParameterByName("twitterId", window.location.href);
			ConstantsList.setToken("twitterId", userTwitterId);
		}
		
	}

	postTweet() {
		let me = this;
		let token = ConstantsList.getToken("token");
		let tokenSecret = ConstantsList.getToken("tokenSecret");
		if (this.tweetMessage && this.tweetMessage.length > 0) {
		  	axios.post(ConstantsList.BASE_URL+'/twitter/postTweet', {
			    tweetMsg: this.tweetMessage,
		  		tokenSecret : tokenSecret,
				token : token
			  })
			  .then(function (response) {
			    if (response && response.data.success) {
			    	me.tweetMessage = "";
					me.loadTimeline();
			    }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		}
	}

	tewwtMessageCinaged = (event)=> {
		this.tweetMessage = event.target.value;
	}

	loadTimeline() {
		let me = this;
		let token = ConstantsList.getToken("token");
		let tokenSecret = ConstantsList.getToken("tokenSecret");

		axios.get(ConstantsList.BASE_URL+'/twitter/getTimeline?token='+token+"&tokenSecret="+tokenSecret)
			  .then(function (response) {
			  	me.setState({
			    	timeline: response.data.data
			    });
			  	
			  })
			  .catch(function (error) {
			    console.log(error);
		});
	}


	componentDidMount() {
		let me = this;
		let twitterId = ConstantsList.getToken("twitterId");
		if (!ConstantsList.getToken("twitterId") || !ConstantsList.getToken("token") || !ConstantsList.getToken("tokenSecret")) {
			axios.get(ConstantsList.BASE_URL+'/user/getDetailsByTwitterId?twitterId='+twitterId)
			  .then(function (response) {
			  	ConstantsList.setToken("token", response.data.data.token);
			  	ConstantsList.setToken("tokenSecret", response.data.data.tokenSecret);
			    this.loadTimeline();
			  })
			  .catch(function (error) {
			    console.log(error);
			});
		} else {
			this.loadTimeline();
		}
		
	}


	render() {
		return (
				<div className="box box-primary">
	            	<div className="row">
					     <div className="col-md-10">
					        <textarea className="form-control" name="tweetMsg" placeholder="What you think!" onChange={this.tewwtMessageCinaged} value={this.tweetMessage}></textarea>
					      </div>
					      <div className="col-md-2">
					        <button type="submit" name="tweet" className="btn btn-primary btn-block btn-flat" onClick={this.postTweet.bind(this)}>Tweet</button>
					      </div>
					  </div>
					  {
					  	this.state.timeline.map((timeline) => {
					  		return (
					  			<div className="box-body box-profile" key={timeline.id}>
								    <div className="post">
								      <div className="user-block">
								        <img className="img-circle img-bordered-sm" src={timeline.user.profile_image_url} alt="user image" />
								            <span className="username">
								              <a href="#"></a>
								            </span>
								            <span>
								            	<b>{timeline.user.name}</b>
								            </span>
								            <span className="small">
								            	@{timeline.user.screen_name} . {timeline.created_at}
								            </span>
								      </div>
								      <p>
								        {timeline.text}
								      </p>
								    </div>
								  </div>
					  		)
					  	})	
					  }
	          	</div>
			);
	}
}

export default Center;

