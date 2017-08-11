import React from "react"
import ReactDOM from 'react-dom';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Title from "./Header/Title";
import Chat from "./Chat";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {browserHistory} from "react-router";

const myJson = {
	"myData":[
		{"key":"1",  "id":"1",  "chat":"[11, 5, 3]", "pseudo":"FindPeople.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active", "popularity":"35"},
	]
};

export default class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			myJson: myJson
		};
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
		browserHistory.push("/map");
	}

	toChat() {
		browserHistory.push("/chat");
	}

	toLikes() {
		browserHistory.push("/likes");
	}

	handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		browserHistory.push("/");
	}

	toEdit() {
		browserHistory.push("/profil");
	}

	render() {
		return (
			<header id="myHeader">
				<Title>
				</Title>
				<Navbar>
					<Col xs={12} md={7}>
						<Navbar.Header>
							<Navbar.Brand>
								{this.renderLogo()}
							</Navbar.Brand>
						</Navbar.Header>
					</Col>
					<Col xs={12} md={4}>
						<Nav>
							<NavItem onClick={this.toHome}>
								People
							</NavItem>
							<NavItem onClick={this.toChat}>
								Chat
							</NavItem>
							{/* <NavItem onClick={this.toLikes}>
							Likes
						</NavItem> */}
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
					{/* <ul id="messages"></ul>
					<form action="">
					<input id="m" autocomplete="off" /><button>Send</button>
				</form> */}
			</Col>
			<Col xs={12} md={1}>
				<Nav>
					<NavItem id="iconsNotifHeader" className="iconNotif" onClick={this.toLikes}>
						<Badge className="iconNotif"
							badgeContent={0}
							secondary={true}
							badgeStyle={{top: 0, right: 0}}
							>
							{/* <CommunicationChatBubble /> */}
								<IconButton tooltip="Notifications">
									<NotificationsIcon />
								</IconButton>
						</Badge>
					</NavItem>
				</Nav>
			</Col>
		</Navbar>

		<Chat />
		</header>
		);
	}
}
