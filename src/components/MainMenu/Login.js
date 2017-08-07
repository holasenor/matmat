import React from "react"
import { Button, OverlayTrigger, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';
import * as tools from '../../helpers/loginHelpers.js';
import {browserHistory} from "react-router";

// .then(tools.checkUser)
export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal:false,
		};
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	handleSubmit(e) {
		e.preventDefault();
		tools.validateTarget(e.target)
		.then(tools.mailExists)
		.then(tools.signIn)
		.then((isLogged) => {
			if (isLogged) {
				browserHistory.push("/map");
			}
		})
		.catch((err) => {
			alert(err);
		})
	}

	handleResetPassword(e) {
		e.preventDefault();
		// tools.validateModalTarget(e.target)
		// .then(tools.validatePassword)
		// .then(tools.mailExists)
		// .then(tools.sendMail)
		// .then((res) => {
		// 	alert(res.message);
		// })
		// .catch((err) => {
		// 	alert(err);
		// })
	}


	render() {
		return (
			<div className="login">
				<div>
					<form onSubmit={(e) => {this.handleSubmit(e)}}>
						<Row>
							<Col md={12}>
								<label>
									em@il:
								</label>
								<input type="text" name="email" id="email" className="form-control">

								</input>
							</Col>
							<Col md={12}>
								<label>
									Password:
								</label>
								<input type="text" name="password" id="password" className="form-control">
								</input>

							</Col>
						</Row>
						<Row className="form-group">
							<Col md={12}>
								<label>
								</label>
								<Button className="btn-block" bsStyle="primary" bsSize="large" active type="submit" value="Submit">
									Connexion
								</Button>
							</Col>
						</Row>
					</form>
					<div>
						<a onClick={this.open} >
							forget password
						</a>
					</div>
					<Modal show={this.state.showModal} onHide={this.close}>
						<form onSubmit={(e) => this.handleResetPassword(e)}>
							<Modal.Header closeButton>
								<Modal.Title className="center">
									enter your email adress
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<label>
									em@il:
								</label>
								<input type="text" name="email" id="email" className="form-control">
								</input>
								<label>
									new password:
								</label>
								<input type="password" name="password" id="password" className="form-control">
								</input>

							</Modal.Body>
							<Modal.Footer className="center">
								<Button onClick={this.close}>
									Close
								</Button>
								<Button bsStyle="success" type="submit" value="Submit">
									Send
								</Button>
							</Modal.Footer>
						</form>
					</Modal>
				</div>
			</div>
		)
	}
}
