import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome.js';
import Welcome0 from './components/Welcome0.js';
import { Router, Route, browserHistory} from 'react-router';


ReactDOM.render(
    <Router history={browserHistory}>
    <Route path="/" component={Welcome}/>
    <Route path="/about" component={Welcome0}/>
    <Route path="*" component={Welcome0}/>
    </Router>
    , document.getElementById('App')
);
