import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Inscription from "./MainMenu/Inscription";
import Login from "./MainMenu/Login";
import RightBar from "./Mapping/RightBar";
import MyMap from './Mapping/ReactGmaps';
import {checkTokenIsSet} from "../helpers/loginHelpers.js";
var geolib = require('geolib');


export default class Mapping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.login ='admin';
		this.state.myInfo = this.props.myInfo;
		this.state.people = this.props.people;
		this.setMyPeople = this.setMyPeople.bind(this);
	}

	setMyPeople(myPeople) {
		this.setState({
			people: myPeople
		});
	}

	removePeopleThatTheUserBlocked() {
		var blockedIds = this.state.myInfo.block;
		return this.state.people.filter((person) => {
			if (blockedIds.indexOf(person._id) == -1) {
				return true;
			}
			else {
				return false;
			}
		});

	}

	setCenter() {
		var arrayOfCoords = this.state.people.map(function (person) {
			return {lat: person.lat, lng: person.lng}
		});
		var center = geolib.getCenterOfBounds(arrayOfCoords);
		center = {lat: center.latitude, lng: center.longitude};
		return center;
	}

	render() {
		var peopleToDisplay = this.removePeopleThatTheUserBlocked();
		var center = this.setCenter();
		var zoom = 11;
		return (
			<div className="mapping">
				{this.state.login}
				<div id="gtco-header" className="gtco-cover gtco-cover-md">
					<Col md={12}>
						<Row className="row-mt-15em">
							<Col md={8} className="iframe-rwd">
								<MyMap myPeople={peopleToDisplay} center={center} zoom={zoom}>
								</MyMap>
							</Col>
							<Col md={4}>
								<RightBar myInfo={this.state.myInfo} myPeople={peopleToDisplay} setMyPeople={this.setMyPeople} socket={this.props.socket}>
								</RightBar>
							</Col>
						</Row>
					</Col>
				</div>
				<div>
					_
				</div>
			</div>
		);
	}
}
