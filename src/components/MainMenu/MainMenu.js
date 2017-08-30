import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Inscription from "./Inscription";
import Login from "./Login";
import {checkTokenIsSet} from "../../helpers/loginHelpers.js";


export default class MainMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {activeKey: 1}
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(selectedKey) {
		this.setState({activeKey: selectedKey})
	}

	renderForm() {
		if (this.state.activeKey == 1) {
			//so i can use handleSelect after creating a user
			return <Inscription handleSelect={this.handleSelect}/>
		}
		else {
			return <Login />
		}
	}

	render() {
		checkTokenIsSet('main');
		var src = "../../images/Logo.png";
		return (
			<div className="mainMenu">
				<div>
					<Col xs={12} md={8} className="matchaDescription">
						<Row>
							<h1>
								Matcha
							</h1>
							<img src={src}>
							</img>
							<h2>
								tu veux pécho pres de chez toi ?
							</h2>
						</Row>
					</Col>

					<Col xs={12} md={3} id="menu-inscription">
						<Nav bsStyle="tabs" justified activeKey={this.state.activeKey}>
							<NavItem onClick={() => this.handleSelect(1)} activeKey="1" >
								Inscrption
							</NavItem>
							<NavItem onClick={() => this.handleSelect(2)} activeKey="2" title="Item" className="loginButton">
								Login
							</NavItem>
						</Nav>
						{this.renderForm()}
					</Col>
					<Col xs={1} md={1}>
					</Col>
				</div>
			</div>


		);
	}
}
