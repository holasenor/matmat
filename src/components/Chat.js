import React from "react"
import Title from "./Header/Title";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {browserHistory} from "react-router";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



export default class Chat extends React.Component {
	constructor() {
		super();
		this.state = {
			login : "Admin",
			down  : "false"
		};
	}
	down(e) {
		// console.log("close mesenger");
		$('#downChat').fadeOut();
		$('.messages').fadeOut();
		$('#upmessages').fadeIn();
	}

	up(e) {
		// console.log("open mesenger");
		$('#downChat').fadeIn();
		$('.messages').fadeIn();
		$('#upmessages').fadeOut();
	}

	render() {
		return (
			<Col xs={12} md={4} id="myChat">
				<div id="upmessages" onClick={(e) => {this.up(e)}}>^</div>
				<div id="downChat" onClick={(e) => {this.down(e)}}>x</div>
				<div id="allMessages">
					<div className="users">
						<li className="messages">
						</li>
					</div>
				</div>
				<Col id="loginform">
					<form action="" id="formulaireChat">
						{/*} <input type="text" id="login" name="login" placeholder="login"  className="form-control1"></input>
						 <input type="text" id="room" name="room" placeholder="room"  className="form-control1"></input>
						 <input type="submit" value="Send" className="btn btn-primary"></input> */}
						<TextField hintText="pseudo" id="login" name="login"/>
						<TextField hintText="room" id="room" name="room"/>
						<RaisedButton type="submit" label="Send" primary={true} />
					</form>
				</Col>
				<Col id="form">
					<form action="" id="formulaireChat">
						<input type="text" id="login" name="login" placeholder="login"  className="form-control1" hidden></input>
						<input type="text" id="myroom" name="myroom" placeholder="myroom" value="" className="form-control1" hidden></input>
						{/*}<input type="text" id="message" name="message" placeholder="message"  className="form-control1"></input>
						<input type="submit" value="Send" className="btn btn-primary"></input> */}
						<TextField hintText="message" id="message" name="message"/>
						<RaisedButton type="submit" label="Send" primary={true} />
					</form>
				</Col>
			</Col>
		);
	}
}
