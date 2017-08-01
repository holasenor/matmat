import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome.js';
import { Router, Route, browserHistory} from 'react-router';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Welcome}/>
        <Route path="/about" component={Welcome}/>
        <Route path="*" component={Welcome}/>
    </Router>
    , document.getElementById('App')
);
