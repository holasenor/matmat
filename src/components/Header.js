import React from "react"
import ReactDOM from 'react-dom';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Title from "./Header/Title";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown, ButtonToolbar, DropdownButton,  Glyphicon} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItemUI from 'material-ui/MenuItem';
import {browserHistory} from "react-router";
import * as tools from '../helpers/mainHelper.js';
import { getMyVisitorsInfo } from "./../helpers/mainHelper.js";
import Chat from "./Chat";




const myJson = {
	"myData":[
		{"key":"1",  "id":"1",  "chat":"[11, 5, 3]", "pseudo":"FindPeople.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active", "popularity":"35"},
	]
};

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "Admin",
			 open: false,
			 myVisitorsInfo: [],

		 };
		this.state.myInfo = this.props.myInfo;
		this.toEdit = this.toEdit.bind(this);
		this.toHome = this.toHome.bind(this);
	}
	//je vais chercher les infos dans la bdd apres le constructeur
	// - componentDidMount
	// - la fonction getVisitors ici
	// - le mainHelper : fonction getMyVisitorsInfo
	// - creer la route /myvisitorsinfo
	// - dans route :  creer getMyVisitorsInfo
	// - dns routHelpers => creer et utiliser la fonction getMyVisitorsInfo

	componentDidMount() {
        if (this.state.myInfo) {
			this.getVisitors(this.state.myInfo.visits);
        }
    }

	getVisitors(visits) {
		var tab = [];
		for (var i = 0; i < visits.length; i++) {
			tab.push(visits[i].who);
		}
		getMyVisitorsInfo(tab)
		.then((result) => {
			this.setState({myVisitorsInfo: result});
			// console.log(this.state.myVisitorsInfo);
		});
	}

	handleTouchTap = (event) => {
		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

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

	renderListVisitor(object, key) {
		var srcList = "https://cdn.intra.42.fr/users/medium_default.png";
		if (object.pictures) {
			srcList = object.pictures
		}
		return (
			<MenuItem key={key} eventKey={key} className="showVisitors">
				<img className="avatarVisitor" src={srcList}>
				</img>
				<span>
					{object.pseudo} |
				</span>

			</MenuItem>
		)
	}


	listVisitor(myPeople) {
		var grid = [];
		grid.push(<MenuItem header key={myPeople.length}>Recent visits</MenuItem>);
		grid.push(<MenuItem key={myPeople.length + 1} divider />)
		for (var i = 0; i < myPeople.length; i++) {
			grid.push(this.renderListVisitor(myPeople[i], i));
		}
		return grid;
	}

	toHome() {
		// browserHistory.push({pathname: "/map", state: this.state.myInfo});
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
		browserHistory.push({pathname: "/profil", state: this.state.myInfo});
	}

	renderVisitsMenu(numberOfVisits) {
		if (this.state.myInfo) {
		var title = <i className="glyphicon glyphicon-bell">{numberOfVisits}</i>;
			return (
				<NavDropdown title={<i className="glyphicon glyphicon-bell"> {numberOfVisits} </i>} id="basic-nav-dropdown">
				{this.listVisitor(this.state.myVisitorsInfo)}
			</NavDropdown>
		);
		}
	}

	render() {
		var numberOfVisits = 0;
		if (this.state.myInfo) {
			if (this.state.myInfo.visits) {
				// console.log('you have ' + this.state.myInfo.visits.length + ' visits');
				var numberOfVisits = this.state.myInfo.visits.length;
			}
			else {
				console.log('you do not have visits');
			}
		}
		else {
			console.log('You do not have YourInfo');
		}
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
						{this.renderVisitsMenu(numberOfVisits)}
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
