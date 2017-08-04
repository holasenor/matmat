import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Inscription from "./MainMenu/Inscription";
import Login from "./MainMenu/Login";
import Footer from "./Footer";
import RightBar from "./Mapping/RightBar";
import Container from "./Mapping/Container";
// import GoogleMap from "./Mapping/Googlemap";
import Maptest from "./Mapping/Maptest";
import {GoogleMapReact} from 'google-map-react'
import GMap from './Mapping/Maptest';
export default class Mapping extends React.Component {
	constructor() {
		super();
		this.state = {login: "Admin"};
	}


	render() {

		const markers = 135;
		const myJson = {
			"data":[
				{"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "Lat":"48.583148","Lng":"7.747882", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg"},
				{"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "Lat":"48.856614","Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg"},
				{"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "Lat":"45.764043","Lng":"4.83565", "photo":"https://cdn.intra.42.fr/users/medium_eozdek.jpg"},
				{"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"female", "Lat":"46.764043","Lng":"4.83565", "photo":"https://cdn.intra.42.fr/users/medium_jaubard.jpg"},
				{"pseudo":"Peter", "email":"Jones@test.com", "age":"58","sexe":"male", "like":"male", "Lat":"45.764043","Lng":"5.83565", "photo":"https://cdn.intra.42.fr/users/medium_stoussay.jpg"}
			]
		};

		var initialCenter = { lng: -90.1056957, lat: 29.9717272 }
		return (


			<div className="mapping">
				<Container />

				{this.state.login}
				<div id="gtco-header" className="gtco-cover gtco-cover-md">
					<Col md={12}>
						<Row className="row-mt-15em">
							<Col md={8} className="iframe-rwd">
								{/* ===============GOOGLEMAP============== */}
								<div id="container">
									<GMap initialCenter={initialCenter} />
								</div>
								{/* ===============/GOOGLEMAP============== */}
							</Col>
							<Col md={4}>
								<RightBar />
							</Col>
						</Row>
					</Col>
				</div>
				<div> _ </div>
				<Footer />

			</div>


		);
	}
}

// AIzaSyAfaj7CW3OP8HFWLMMg8VX3OEaKIcxD98M
// AIzaSyBQjEp_eMuZrw1NHshKPn9Fu84P47NUMq8
