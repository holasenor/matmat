import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Inscription from "./MainMenu/Inscription";
import Login from "./MainMenu/Login";
import Footer from "./Footer";
import RightBar from "./Mapping/RightBar";
import MyMap from './Mapping/ReactGmaps';
import {checkTokenIsSet} from "../helpers/loginHelpers.js";

export default class Mapping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.login ='admin';
		this.state.myInfo = this.props.myInfo;
		this.state.people = this.props.people;
	}

	render() {
		return (
			<div className="mapping">
				{this.state.login}
				<div id="gtco-header" className="gtco-cover gtco-cover-md">
					<Col md={12}>
						<Row className="row-mt-15em">
							<Col md={8} className="iframe-rwd">
								<MyMap myPeople={this.state.people} />
							</Col>
							<Col md={4}>
								<RightBar myInfo={this.state.myInfo} myPeople={this.state.people.myData}/>
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
