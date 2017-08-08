import React from "react"
import Title from "./Header/Title";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {browserHistory} from "react-router";

export default class Chat extends React.Component {
	constructor() {
		super();
		this.state = {login: "Admin"};
	}

	render() {
		return (
			<div id="myChat">
				<Navbar>
				<Col xs={12} md={12}>
					<div>
						<div id="users">
						</div>

						<div id="messages">
							<p>message : </p>
							<span>date : </span>
						</div>
						<Col id="loginform">
							<form action="" id="formulaireChat">
								<input type="text" id="login" name="login" placeholder="login"  className="form-control1"></input>
								<input type="mail" id="mail" name="mail" placeholder="m@il"  className="form-control1"></input>
								<input type="submit" value="Send" className="btn btn-primary"></input>
							</form>
						</Col>
						<div>

						</div>
					</div>
				</Col>
			</Navbar>
		</div>
	);
}
}
