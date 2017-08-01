import React from "react"
import Title from "./Header/Title";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';



export default class Header extends React.Component {
	constructor() {
		super();
		this.state = {login: "Admin"};
	}


  render() {
    return (
    <header id="myHeader">
        <Title />

        <Navbar>
        <Col xs={12} md={8}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">MATCHA.<img className="mylogo" src="../../images/Logo.png"/></a>
          </Navbar.Brand>
        </Navbar.Header>
        </Col>
        <Col xs={6} md={4}>
          <Nav>
            <NavItem eventKey={1} href="#">People</NavItem>
            <NavItem eventKey={2} href="#">Login</NavItem>
            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
              <MenuItem eventKey={3.5}>{this.state.login}</MenuItem>
            </NavDropdown>
          </Nav>
          </Col>
        </Navbar>

		</header>
    );
  }
}
