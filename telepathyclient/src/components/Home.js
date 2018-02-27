import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Left from './Left';
import Center from './Center';

export default () => {
	
	return (
		
		<div className="container">
			<nav className="navbar navbar-default">
  				<div className="container-fluid">
    				<div className="navbar-header">
  						 <a className="navbar-brand" href="#">TwitterPluz</a>
  						 <a href="#" className="navbar-right tweetBtn"><span className="tweetBtn-span">Tweet</span></a>
    				</div>
  				</div>
			</nav>
			<div className="row">
				<div className="col-md-4">
					<Left />
				</div>
				<div className="col-md-8">
					<Center />
				</div>
			</div>
		</div>
	)
};