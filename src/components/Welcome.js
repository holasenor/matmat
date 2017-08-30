import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Header from "./Header";
import Footer from "./Footer";
import Video from "./Video";
import Mapping from "./Mapping";
import MainMenu from "./MainMenu/MainMenu";
import GridImagesExample from "./MainMenu/GridImageExample";



class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {name: "Pedro state"}
  }

  render() {
    const title="test props dans le welcome";
	const myJson = {
	  "data":[
		  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "Lat":"48.8965533", "Lng":"21.352222", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active"},
		  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_eozdek.jpg", "bio":"En recherche active"},
		  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"female", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_jaubard.jpg", "bio":"En recherche active"},
		  {"pseudo":"sergie", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_svelhinh.jpg", "bio":"En recherche active"},
		  {"pseudo":"pontoise", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_grass-kw.jpg", "bio":"En recherche active"},
		  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"female", "like":"male", "Lat":"48.856614", "Lng":"21.352222", "photo":"https://cdn.intra.42.fr/users/medium_eozdek.jpg", "bio":"En recherche active"},
		  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active"},
		  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "Lat":"48.8965531", "Lng":"21.352220", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active"},
		  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"female", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_aribeiro.jpg", "bio":"En recherche active"},
		  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"female", "like":"female", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		  {"pseudo":"Peter", "email":"Jones@test.com", "age":"58","sexe":"male", "like":"male", "Lat":"48.756614" , "Lng":"2.952222", "photo":"https://cdn.intra.42.fr/users/medium_stoussay.jpg", "bio":"En recherche active"}
	  ]
	};
	//   console.log(myJson);

    return (
      <div className='mybody'>
        <Header title={title}/>
        <MainMenu />
        <GridImagesExample />
        {/*}<Mapping />*/}
        {/*<Footer />*/}

      </div>
    );
  }
}

export default Welcome;
