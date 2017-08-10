import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, InputGroup, FormGroup, Addon, FormControl, ProgressBar, bsStyle} from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
import Header from "./Header";
import Footer from "./Footer";
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';


const styles = {
	chip: {
		margin: 4,
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
};


function handleRequestDelete() {
	alert('You clicked the delete button.');
}

function handleTouchTap() {
	alert('You clicked the Chip.');
}


class YourMatches extends React.Component {
	constructor() {
		super();

		const myInfo = {"_id":"2",
		"pseudo":"lopettes",
		"email":"Doe@test.com",
		"age":"30",
		"sexe":"male",
		"like":"female",
		"position": {"lat":"49.896533",
					"lng":"2.318536"},
		"images": ["https://cdn.intra.42.fr/users/medium_vroux-ba.jpg", "somethingelse.pjg"],
		"bio":"En recherche active",
		"popularity":"35",
		"liked": ['id1', 'id2'],
		"likedBy": ['id3', 'id4']
	};

// MATCHES


		const myJson = {
			"myData":[
				{"key":"1",  "id":"1",  "chat":"[11, 2, 3]", "pseudo":"Profil.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active", "popularity":"35"},
				{"key":"2",  "id":"2",  "chat":"[12, 5]", "pseudo":"lopettes", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.896533", "lng":"2.318536", "img_src":"https://cdn.intra.42.fr/users/medium_vroux-ba.jpg", "bio":"En recherche active", "popularity":"35"},
			]
		};
		this.state = {
			name: "| Pedro state",
		};
		this.state.myProfil = myJson;
		this.state.myInfo = myInfo;
	}

	renderChips() {
		return (

			<div style={styles.wrapper}>
				<Chip
					onRequestDelete={handleRequestDelete}
					onTouchTap={handleTouchTap}
					style={styles.chip}
					>
						<Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />
						Deletable Avatar Chip {this.state.name}
					</Chip>

					<Chip
						backgroundColor={blue300}
						onRequestDelete={handleRequestDelete}
						onTouchTap={handleTouchTap}
						style={styles.chip}
						>
							<Avatar size={32} color={blue300} backgroundColor={indigo900}>
								MB
							</Avatar>
							Colored Chip
						</Chip>
					</div>
				)
			}

	renderChatList() {
		return (
			<div >
			 </div>
			)
		}

		renderListChat() {
			return (
				<div>
				<List>
			      <Subheader>Recent chats</Subheader>
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
			    <Divider />
			    <List>
			      <Subheader>Previous chats</Subheader>
			      <ListItem
			        primaryText="Chelsea Otakan"
			        leftAvatar={<Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />}
			      />
			      <ListItem
			        primaryText="James Anderson"
			        leftAvatar={<Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />}
			      />
			    </List>
			</div>
			)
		}

			render() {
				return (
					<div className='mybody'>
					<Header />

							{this.renderChips()}

							{this.renderListChat()}

					<Footer />
					</div>
					);
				}
			}

			export default YourMatches;
