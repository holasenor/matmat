import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome.js';
import FindPeople from './components/FindPeople.js';
import EditProfil from './components/Profil/EditProfil';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import YourMatches from './components/YourMatches.js';
import { Router, Route, browserHistory} from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

ReactDOM.render(

    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={Welcome}/>
            <Route path="/map" component={FindPeople}/>
            <Route path="/profil" component={EditProfil}/>
			<Route path="/likes" component={YourMatches}/>
            <Route path="*" component={Welcome}/>
        </Router>
    </MuiThemeProvider>
, document.getElementById('App')
);
