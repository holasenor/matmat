import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {checkTokenIsSet} from '../helpers/loginHelpers';
import Header from "./Header";
import Footer from "./Footer";
import Video from "./Video";
import Mapping from "./Mapping";

const myJson = {
  "myData":[
    {"key":"1",  "id":"1",  "chat":"[11, 5, 3]", "pseudo":"FindPeople.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_default.png", "bio":"En recherche active", "popularity":"35"},
    {"key":"2",  "id":"2",  "chat":"[12, 5, 3]", "pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "lat":"38.856614", "lng":"7.352222", "img_src":"https://cdn.intra.42.fr/users/medium_aribeiro.jpg", "bio":"En recherche active", "popularity":"35"},
    {"key":"3",  "id":"3",  "chat":"[13, 5, 3]", "pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"female", "like":"female", "lat":"45.956614" , "lng":"2.352222", "img_src":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"4",  "id":"4",  "chat":"[14, 5, 3]", "pseudo":"FindPeople.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"48.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_jyakdi.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"5",  "id":"5",  "chat":"[15, 5, 3]", "pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "lat":"45.856614" , "lng":"12.352222", "img_src":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"6",  "id":"6",  "chat":"[16, 5, 3]", "pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "lat":"38.856614", "lng":"7.352222", "img_src":"https://cdn.intra.42.fr/users/medium_eozdek.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"7",  "id":"7",  "chat":"[17, 5, 3]", "pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"female", "lat":"48.956614" , "lng":"2.352222", "img_src":"https://cdn.intra.42.fr/users/medium_jaubard.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"8",  "id":"8",  "chat":"[1, 5, 3]", "pseudo":"sergie", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "lat":"38.856614", "lng":"7.352222", "img_src":"https://cdn.intra.42.fr/users/medium_svelhinh.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"9",  "id":"9",  "chat":"[5, 5, 3]", "pseudo":"pontoise", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "lat":"48.956614" , "lng":"2.352222", "img_src":"https://cdn.intra.42.fr/users/medium_grass-kw.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"10", "id":"10", "chat":"[1, 5, 3]", "pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"female", "like":"male", "lat":"48.856614", "lng":"21.352222", "img_src":"https://cdn.intra.42.fr/users/medium_eozdek.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"11", "id":"11", "chat":"[1, 5, 3]", "pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "lat":"45.856614" , "lng":"12.352222", "img_src":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"12", "id":"12", "chat":"[1, 5, 3]", "pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "lat":"38.856614", "lng":"7.352222", "img_src":"https://cdn.intra.42.fr/users/medium_svalette.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"13", "id":"13", "chat":"[1, 5, 3]", "pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "lat":"48.956614" , "lng":"2.352222", "img_src":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"14", "id":"14", "chat":"[1, 5, 3]", "pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"48.8965531", "lng":"21.352220", "img_src":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"15", "id":"15", "chat":"[1, 5, 3]", "pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"female", "like":"male", "lat":"45.856614" , "lng":"12.352222", "img_src":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"16", "id":"16", "chat":"[1, 5, 3]", "pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "lat":"38.856614", "lng":"7.352222", "img_src":"https://cdn.intra.42.fr/users/medium_aribeiro.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"17", "id":"17", "chat":"[1, 5, 3]", "pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"female", "like":"female", "lat":"48.956614" , "lng":"2.352222", "img_src":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active", "popularity":"35"},
	{"key":"18", "id":"18", "chat":"[1, 5, 3]", "pseudo":"Peter", "email":"Jones@test.com", "age":"58","sexe":"male", "like":"male", "lat":"48.756614" , "lng":"2.952222", "img_src":"https://cdn.intra.42.fr/users/medium_stoussay.jpg", "bio":"En recherche active", "popularity":"35"}
  ]
};

class FindPeople extends React.Component {
  constructor() {
    super();
    this.state = {
		name: "Pedro state",
		myJson: myJson
	};

  }

  render() {
     checkTokenIsSet('map');
    const title="test props mapping";
    return (
      <div className='mybody'>
        <Header title={title}/>
        <Mapping myJson={myJson}/>

      </div>
    );
  }
}

export default FindPeople;
