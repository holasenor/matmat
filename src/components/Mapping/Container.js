import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {withGoogleMap, InfoWindow, Marker, GoogleMap} from "react-google-maps";

export default class Container extends React.Component {
	constructor() {
		super();
		this.state = {
			login: "Admin",
		};
	}

	render() {

		return (
			<div id="map">

			 </div>
	);
}
}
