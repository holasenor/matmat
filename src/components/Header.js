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
import { getMyVisitorsInfo, getUsersInfo} from "./../helpers/mainHelper.js";



export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "Admin",
			 open: false,
			 myVisitorsInfo: [],
			 notifications: []
		 };
		this.state.myInfo = this.props.myInfo;
		this.toEdit = this.toEdit.bind(this);
		this.toHome = this.toHome.bind(this);
		this.handleClickNotifications = this.handleClickNotifications.bind(this);
	}
	//je vais chercher les infos dans la bdd apres le constructeur
	// - componentDidMount
	// - la fonction getVisitors ici
	// - le mainHelper : fonction getMyVisitorsInfo
	// - creer la route /myvisitorsinfo
	// - dans route :  creer getMyVisitorsInfo
	// - dns routHelpers => creer et utiliser la fonction getMyVisitorsInfo

	componentDidMount() {
		var socket = this.props.socket;

        if (this.state.myInfo) {
			this.getVisitors(this.state.myInfo.visits);
        }
		socket.emit('getNotifications', this.state.myInfo._id);
		// notification - {action = like visit message match dislike
		//					userId }

		socket.on('newNotifications', (notifications) => {
			if (notifications) {
				var ids = notifications.map(function (notification) {
					return notification.userId;
				})
				var uniqueIds = _.uniq(ids);
				getUsersInfo(uniqueIds)
				.then((users) => {
					var userMap = _.keyBy(users, '_id');
					notifications.map(function (notification) {
						notification.user = userMap[notification.userId];
					});
					this.setState({notifications: notifications});
					console.log(notifications);
				})
			}
		})
    }

	getVisitors(visits) {
		var tab = [];
		for (var i = 0; i < visits.length; i++) {
			tab.push(visits[i].who);
		}
		getMyVisitorsInfo(tab)
		.then((result) => {
			this.setState({myVisitorsInfo: result});
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

	renderNotificationInNav() {
		var numberOfNotifications = 0;
		if (this.state.notifications) {
			numberOfNotifications = this.state.notifications.length;
		}
		return (
			<NavDropdown title={<i className="glyphicon glyphicon-bell"> {numberOfNotifications} </i>} id="basic-nav-dropdown" onClick={this.handleClickNotifications}>
				{this.renderNotifications(this.state.notifications)}
			</NavDropdown>
		);
	}

	handleClickNotifications() {
		var socket = this.props.socket;
		// setTimeout(() => {
		// 	this.setState({notifications: []});
		// 	socket.emit('deletemyNotifications', this.state.myInfo._id);
		// }, 10000);
	}

	renderNotifications(notifications) {
		var grid = [];
		if (notifications && notifications.length) {
			grid.push(<MenuItem header key={notifications.length}>Notifications</MenuItem>);
			grid.push(<MenuItem key={notifications.length + 1} divider />)
			for (var i = 0; i < notifications.length; i++) {
				grid.push(this.renderNotification(notifications[i], i));
			}
			return grid;
		}
	}

	renderNotification(object, key) {
		var text;
		var srcImg = 'http://www.thesourcepartnership.com/wp-content/uploads/2017/05/facebook-default-no-profile-pic-300x300.jpg';
		if (object.user.pictures && object.user.pictures[0]) {
			srcImg = object.user.pictures[0];
		}
		if (object.action == 'like') {
			text = ' You were liked by ' + object.user.pseudo;
		}
		else if (object.action == 'message') {
			text = ' You have a new message from ' + object.user.pseudo;
		}
		else if (object.action == 'dislike') {
			text = ' You were disiked by ' + object.user.pseudo;
		}
		else if (object.action == 'match') {
			text = ' You have a new match with ' + object.user.pseudo;
		}
		else if (object.action == 'visit') {
			text = ' You were visited by ' + object.user.pseudo;
		}
		else {
			text = ' You have a new notification';
		}
		return (
			<MenuItem key={key} eventKey={key} className="showVisitors">
				<img className="avatarVisitor" src={srcImg}>
				</img>
				<span>
					{text}
				</span>
			</MenuItem>
		)
	}


	render() {
		var numberOfVisits = 0;
		if (this.state.myInfo) {
			if (this.state.myInfo.visits) {
				console.log('you have ' + this.state.myInfo.visits.length + ' visits');
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
						{this.renderVisitsMenu(numberOfVisits)}
						{this.renderNotificationInNav()}
					</Nav>
				</Col>

			</Navbar>
		</header>
	);
}
}
