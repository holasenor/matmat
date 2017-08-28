import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome.js';
import FindPeople from './components/FindPeople.js';
import EditProfil from './components/Profil/EditProfil';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory} from 'react-router';

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={Welcome}/>
            <Route path="/map" component={FindPeople}/>
            <Route path="/profil" component={EditProfil}/>
            <Route path="*" component={Welcome}/>
        </Router>
    </MuiThemeProvider>
, document.getElementById('App')
);
