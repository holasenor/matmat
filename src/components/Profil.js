import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Header from "./Header";
import Footer from "./Footer";
import Video from "./Video";
import Mapping from "./Mapping";
import EditProfil from "./Profil/EditProfil";

const myJson = {
  "myData":[
    {"key":"1", "pseudo":"Profil.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active", "popularity":"35"},
	  {"key":"18", "pseudo":"Peter", "email":"Jones@test.com", "age":"58","sexe":"male", "like":"male", "lat":"48.756614" , "lng":"2.952222", "img_src":"https://cdn.intra.42.fr/users/medium_stoussay.jpg", "bio":"En recherche active", "popularity":"35"}
  ]
};

class Profil extends React.Component {
  constructor() {
    super();
    this.state = {
		name: "Pedro state",
		myJson: myJson
	};

  }

  render() {
    const title="Edit your profil";
    return (
      <div className='mybody'>
        <EditProfil myJson={myJson}/>
      </div>
    );
  }
}

export default Profil;
