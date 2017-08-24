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
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItemUI from 'material-ui/MenuItem';
import {browserHistory} from "react-router";

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {login: "Admin", open: false};
		this.state.myInfo = this.props.myInfo;
		this.toEdit = this.toEdit.bind(this);
		this.toHome = this.toHome.bind(this);
	}

	handleTouchTap = (event) => {
		// This prevents ghost click.
		event.preventDefault();

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

	showVisitors() {
		return (
			<Col md={3} xs={6} id="showVisitors">


				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
					animation={PopoverAnimationVertical}
					>
						<List>
							<Subheader>Recent visits</Subheader>
							<ListItem
								primaryText="Brendan Lim"
								leftAvatar={<Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />}
								rightIcon={<CommunicationChatBubble />}
							/>
							<ListItem
								primaryText="Eric Hoffman"
								leftAvatar={<Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />}
								rightIcon={<CommunicationChatBubble />}
							/>
							<ListItem
								primaryText="Grace Ng"
								leftAvatar={<Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />}
								rightIcon={<CommunicationChatBubble />}
							/>
							<ListItem
								primaryText="Kerem Suer"
								leftAvatar={<Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />}
								rightIcon={<CommunicationChatBubble />}
							/>
							<ListItem
								primaryText="Raquel Parrado"
								leftAvatar={<Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />}
								rightIcon={<CommunicationChatBubble />}
							/>
						</List>
					</Popover>
				</Col>
			)
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
						<Col xs={6} md={3}>
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
						<Col xs={12} md={1}>
							<Badge
								badgeContent={this.state.myInfo.visits.length}//mettre le bon nombre de visites
								secondary={true}
								badgeStyle={{top: 1, right: 1}}
								id="badgeNotificationHeader"
								onClick={this.handleTouchTap}
								>
									<IconButton tooltip="Notifications">
										<NotificationsIcon />
									</IconButton>
								</Badge>

							</Col>
						</Navbar>
						{this.showVisitors()}
					</header>
				);
			}
		}
