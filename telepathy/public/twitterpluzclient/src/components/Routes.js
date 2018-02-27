import React from 'react';
import { BrowserRouter, Switch, Route , Redirect} from 'react-router-dom';

import Home from './Home';
import Login from './Login';

export default () => (
<BrowserRouter>
	<Switch>
		<Route exact path="/" component={Login}/>
		<Route exact path="/login" component={Login}/>
		<Route exact path="/home" component={Home}/>
	</Switch>
</BrowserRouter>
);
