import React from "react"
import Title from "./Header/Title";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {browserHistory} from "react-router";

export default class Chat extends React.Component {
	constructor() {
		super();
		this.state = {
			login : "Admin",
			down  : "false"
	};
	}
	down(e) {
		console.log("close mesenger");
		// ('#downChat').fadOut();
	}

	render() {
		return (
			<Col xs={12} md={3} id="myChat">
				{/* <i className="fa fa-angle-down" aria-hidden="true">x</i> */}
					<div id="downChat" onClick={(e) => {this.down(e)}}>x</div>
					<div id="messages">
						<div>
							<div id="users">
							</div>

						</div>
					</div>
						<Col id="loginform">
							<form action="" id="formulaireChat">
								<input type="text" id="login" name="login" placeholder="login"  className="form-control1"></input>
								{/* <input type="text" id="txt" name="txt" placeholder="message"  className="form-control1"></input> */}
								<input type="mail" id="mail" name="mail" placeholder="m@il"  className="form-control1"></input>
								<input type="submit" value="Send" className="btn btn-primary"></input>
							</form>
						</Col>
						<Col id="form">
							<form action="" id="formulaireChat">
								<input type="text" id="login" name="login" placeholder="login"  className="form-control1" hidden></input>
								<input type="text" id="message" name="message" placeholder="message"  className="form-control1"></input>
								<input type="submit" value="Send" className="btn btn-primary"></input>
							</form>
						</Col>
				</Col>
		);
	}
}
