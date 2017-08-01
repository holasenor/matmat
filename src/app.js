import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome.js';
import FindPeople from './components/FindPeople.js';
import { Router, Route, browserHistory} from 'react-router';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Welcome}/>
        <Route path="/map" component={FindPeople}/>
        <Route path="*" component={Welcome}/>
    </Router>
    , document.getElementById('App')
);
