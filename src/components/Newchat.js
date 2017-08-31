import React from "react"
import Title from "./Header/Title";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {browserHistory} from "react-router";
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client'




export default class Newchat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages : [],
			lastmsg: false
		};
		this.state.myInfo = this.props.myInfo;
	}

	componentDidMount () {
		this.socket = io('/')
		this.socket.on('mesage', message => {
			this.setState({messages: [message, ...this.state.messages] })
		})
		this.socket.on('newmsg', function(msg) {
			// console.log(msg);
		if (msg.room) {
			$('.renderChatMessages').append('<li key={index}><b>'+ msg.pseudo +' : </b>'+ msg.message +'</li>')
			}
		});
	}


	handleSubmit = event => {
		const body = event.target.value;
		if (event.keyCode === 13 && body) {
			const message = {
				body,
				from: 'Me'
			}
			this.setState({messages: [message, ...this.state.messages] })
			this.socket.emit('message', body)
			event.target.value = ''

			this.socket.emit('login', {
				pseudo	  : this.state.myInfo.pseudo,
				room	  : 'idRoom',// idRoom a generer en fonction des likes et likesby
			})

			this.socket.emit('newmsg', {
				pseudo	  : this.state.myInfo.pseudo,
				message	  : body,
				room	  : 'idRoom',
				login     : 'userPseudo',//this.state.myInfo._id,
			})
		}
	}

	up(e) {
		$('#downChat').fadeIn();
		$('.messages').fadeIn();
		$('#upmessages').fadeOut();
	}

	handleToggle = () => this.setState({open: !this.state.open});
	handleClose = () => this.setState({open: false});

	render() {
		// console.log(this.state.myInfo);
		const messages = this.state.messages.map((message, index) => {
			// return <li key={index}><b>{message.from} : </b>{message.body}</li>
		})
		return (
			<div>
				<span id="myChat">
					<RaisedButton
						label="Chat button"
						onClick={this.handleToggle}
					/>
					<Drawer
						docked={false}
						width={300}//mettre au max a 90% de la largeur
						open={this.state.open}
						onRequestChange={(open) => this.setState({open})}
						>
							<MenuItem onClick={this.handleClose}>Your chat</MenuItem>
							<div id="upmessages" onClick={(e) => {this.up(e)}}>^</div>
							{messages}
							<div id="myChat" className="messages">
								<div className="users">
									<li className="messages">
									</li>
								</div>
							</div>
							<div className="renderChatMessages"></div>
							<input type='text' placeholder='write your message' onKeyUp={this.handleSubmit} className="form-control"></input>
						</Drawer>
					</span>
				</div>
			);
		}
	}
