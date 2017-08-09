import React from "react"
import Title from "./Header/Title";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {browserHistory} from "react-router";

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {login: "Admin"};
		this.state.myInfo = this.props.myInfo;
		this.toEdit = this.toEdit.bind(this);
		this.toHome = this.toHome.bind(this);
		console.log('This is header-----------------');
		console.log('state = ',this.state);
		console.log('-------------------------------');
	}

	renderLogo() {
		var src = "../../images/Logo.png";
		var classname = "mylogo";
		return (
			<div onClick={this.toHome}>
				MATCHA.
				<img src={src} className={classname}>
				</img>
			</div>
		);
	}

	toHome() {
		browserHistory.push({pathname: "/map", state: this.state.myInfo});
	}

	toChat() {
		browserHistory.push("/chat");
	}

	handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		browserHistory.push("/");
	}

	toEdit() {
		browserHistory.push({pathname: "/profil", state: this.state.myInfo});
	}

	render() {
		return (
			<header id="myHeader">
				<Title>
				</Title>
				<Navbar>
					<Col xs={12} md={8}>
						<Navbar.Header>
							<Navbar.Brand>
								{this.renderLogo()}
							</Navbar.Brand>
						</Navbar.Header>
					</Col>
					<Col xs={6} md={4}>
						<Nav>
							<NavItem onClick={this.toHome}>
								People
							</NavItem>
							<NavItem onClick={this.toChat}>
								Chat
							</NavItem>
							<NavDropdown title="Account" id="basic-nav-dropdown">
								<MenuItem onClick={this.toEdit}>
									Edit
								</MenuItem>
								<MenuItem divider />
							<MenuItem onClick={this.handleLogout}>
								Logout
							</MenuItem>
						</NavDropdown>
					</Nav>
				</Col>
			</Navbar>
		</header>
	);
}
}
