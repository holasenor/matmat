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
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown, ButtonToolbar, DropdownButton,  Glyphicon} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItemUI from 'material-ui/MenuItem';
import {browserHistory} from "react-router";
import * as tools from '../helpers/mainHelper.js';
import { getMyVisitorsInfo, getUsersInfo} from "./../helpers/mainHelper.js";
import moment from 'moment';


export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "Admin",
			 open: false,
			 visits: [],
			 notifications: [],
			 isNotificationsOpen: false,
			 timeOut: ""
		 };
		this.state.myInfo = this.props.myInfo;
		this.toEdit = this.toEdit.bind(this);
		this.toHome = this.toHome.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		if (this.props.socket) {

		var socket = this.props.socket;

        if (this.state.myInfo) {
			getMyVisitorsInfo(this.state.myInfo.visits)
			.then((visits) => {
				console.log(visits);
				this.setState({
					visits: visits
				});
			});
        }
		socket.emit('getNotifications', this.state.myInfo._id);

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

		socket.on('youWereVisited', (visit) => {
			console.log('YOU WERE VISITED');
			var visitsSoFar = this.state.visits;
			if (visitsSoFar.length == 5) {
				visitsSoFar.shift();
				visitsSoFar.push(visit);
			}
			else {
				visitsSoFar.push(visit);
			}
			this.setState({
				visits: visitsSoFar
			});
		})
	}
    }

	componentWillUnmount() {
		var socket = this.props.socket;
		if (socket) {
			socket.off('newNotifications');
			socket.off('youWereVisited');
		}
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

	renderListVisitor(visit, key) {
		var srcList;
		if (visit.picture) {
			srcList = 'images/uploads/' + visit.picture;
		}
		else {
			srcList = 'images/uploads/default.jpg';
		}
		var time = moment.unix(visit.time / 1000).format('LLL');
		return (
			<MenuItem key={key} eventKey={key} className="showVisitors">
				<img className="avatarVisitor" src={srcList}>
				</img>
				<span>
					{visit.pseudo} | {time}
				</span>

			</MenuItem>
		)
	}


	listVisitor(visits) {
		var grid = [];
		grid.push(<MenuItem header key={visits.length}>Recent visits</MenuItem>);
		grid.push(<MenuItem key={visits.length + 1} divider />)
		for (var i = 0; i < visits.length; i++) {
			grid.push(this.renderListVisitor(visits[i], i));
		}
		return grid;
	}

	toHome() {
		// browserHistory.push({pathname: "/map", state: this.state.myInfo});
		browserHistory.push("/map");
	}

	handleLogout() {
		if (this.props.socket) {
			var socket = this.props.socket;
			socket.emit('logout');
		}
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		browserHistory.push("/");
	}

	toEdit() {
		browserHistory.push({pathname: "/profil", state: this.state.myInfo});
	}

	renderVisitsinNav(numberOfVisits) {
		if (this.state.myInfo) {
			var title = <i className="glyphicon glyphicon-bell">{numberOfVisits}</i>;
				return (
					<NavDropdown title={<i className="glyphicon glyphicon-bell"> {numberOfVisits} </i>} id="basic-nav-dropdown">
					{this.listVisitor(this.state.visits)}
				</NavDropdown>
			);
		}
	}

	deleteNotifications =  () => {
		var socket = this.props.socket;
		socket.emit('deletemyNotifications', this.state.myInfo._id);
		this.setState({notifications: []});
	}

	handleToggle = () => {
		var isOpen = this.state.isNotificationsOpen;
		if (isOpen) {
			console.log('just got closed');
			if (this.state.timeOut != "") {
				clearTimeout(this.state.timeOut);
				console.log('timeout got closed');
				this.setState({timeOut: ""});
			}
			if (this.state.notifications && this.state.notifications.length > 0) {
				this.deleteNotifications();
			}
		}
		else {
			console.log('just got opened');
			var timeOut = setTimeout(this.deleteNotifications, 10000);
			this.setState({timeOut: timeOut});
			console.log('setting timeout = ', timeOut);
		}
		this.setState({isNotificationsOpen: !isOpen});
	}

	renderNotificationInNav() {
		var numberOfNotifications = 0;
		if (this.state.notifications) {
			numberOfNotifications = this.state.notifications.length;
		}
		return (
			<NavDropdown title={<i className="glyphicon glyphicon-bell"> {numberOfNotifications} </i>} id="basic-nav-dropdown" onClick={this.handleClickNotifications} onToggle={this.handleToggle}>
				{this.renderNotifications(this.state.notifications)}
			</NavDropdown>
		);
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
		var srcImg = '/images/uploads/default.jpg';
		if (object.user.pictures && object.user.pictures[0]) {
			srcImg = 'images/uploads/' + object.user.pictures[0];
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
		if (this.state.myInfo && this.state.myInfo.visits) {
			numberOfVisits = this.state.myInfo.visits.length;
		}
		return (
			<header id="myHeader">
				<span>
				</span>
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
							<NavDropdown title="Account" id="basic-nav-dropdown">
								<MenuItem onClick={this.toEdit}>
									Edit
								</MenuItem>
								<MenuItem divider />
							<MenuItem onClick={this.handleLogout}>
								Logout
							</MenuItem>
						</NavDropdown>
						{this.renderVisitsinNav(numberOfVisits)}
						{this.renderNotificationInNav()}
					</Nav>
				</Col>

			</Navbar>
		</header>
	);
}
}
