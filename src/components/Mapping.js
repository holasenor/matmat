import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Inscription from "./MainMenu/Inscription";
import Login from "./MainMenu/Login";
import Footer from "./Footer";
import RightBar from "./Mapping/RightBar";
import Container from "./Mapping/Container";
import MyMap from './Mapping/ReactGmaps';
import {checkTokenIsSet} from "../helpers/loginHelpers.js";

export default class Mapping extends React.Component {
	constructor() {
		super();
		this.state = {
			login: "Admin",
			// Lng: this.props.myJson[0].lng
		}
	}
	// logMyJson() {
	// 	// console.log(this.props.myJson);
	// 	// console.log(this.props.myJson.myData[0].Lat);
	// 	// console.log(this.props.myJson.myData[0].Lng);
	// 	// console.log(this.props.myJson.myData[0].pseudo);
	// }

	render() {
		const markers = 135;
		var initialCenter = { lng: 2.3163477, lat: 48.8965533 }
		// var initialCenter = { lng: this.props.myJson.myData[0].lng, lat: this.props.myJson.myData[0].lat }
		// this.logMyJson();
		return (
			<div className="mapping">
				<Container />
				{this.state.login}
				<div id="gtco-header" className="gtco-cover gtco-cover-md">
					<Col md={12}>
						<Row className="row-mt-15em">
							<Col md={8} className="iframe-rwd">
								{/* ===============GOOGLEMAP============== */}
								<MyMap myJson={this.props.myJson.myData} />
								{/* ===============/GOOGLEMAP============== */}
							</Col>
							<Col md={4}>
								<RightBar myJson={this.props.myJson.myData}/>
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
