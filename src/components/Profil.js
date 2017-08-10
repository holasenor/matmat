import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Header from "./Header";
import Footer from "./Footer";
import Video from "./Video";
import Mapping from "./Mapping";
import EditProfil from "./Profil/EditProfil";

const myJson1 = {
	"myData":[
		{"key":"1",  "id":"1",  "matches":"[11, 2, 3]", "pseudo":"Profil.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active", "popularity":"35"},
		{"key":"2",  "id":"2",  "chat":"[12, 5, 3]", "pseudo":"lopettes", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.896533", "lng":"2.318536", "img_src":"https://cdn.intra.42.fr/users/medium_vroux-ba.jpg", "bio":"En recherche active", "popularity":"35"},
	]
};

class Profil extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "Pedro state",
			myJson: myJson1
		};
		this.state.myInfo = myJson1;
	}

	render() {
		const title="Edit your profil";
		return (
			<div className='mybody'>
				<EditProfil myJson={myJson1}/>
			</div>
		);
	}
}

export default Profil;
