import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Inscription from "./Inscription";
import Login from "./Login";


export default class MainMenu extends React.Component {
  render() {
    return (


  <div className="mainMenu">
  <div >
    <Col xs={12} md={8} className="matchaDescription">
    <Row>
      <h1>Matcha</h1>
      <h2> tu veux pécho pres de chez toi ?</h2>
    </Row>
    </Col>

    <Col xs={12} md={3} id="menu-inscription">
      <Nav bsStyle="tabs" justified activeKey={1} onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="/home">Inscrption</NavItem>
            <NavItem eventKey={2} title="Item" className="loginButton">Login</NavItem>
      </Nav>

      <Inscription />
      {/* <Login /> */}

    </Col>

    <Col xs={1} md={1}>
    </Col>
    </div>
  </div>


    );
  }
}
