import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class LoginSubscription extends React.Component {
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
      <h3>Menu</h3>
      <form action="#" >
      <Row>
      <Col md={12}>
      <label>
        Pseudo:
        </label>
        <input type="text" name="pseudo" id="pseudo" className="form-control"/>
      </Col>
      <Col md={12}>
          <label>Gender</label>
          <select name="#" id="sexe" className="form-control">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">...</option>
          </select>
        </Col>

      <Col md={12}>
      <label>
        Description:
        </label>
        <input type="textarea" name="bio" id="bio" className="form-control"/>
      </Col>
      <Col md={12}>
      <label>
        City:
        </label>
        <input placeholder="your location if you want" type="text" name="town" id="town" className="form-control"/>
      </Col>

      <Col md={12}>
          <label>Like</label>
          <select name="#" id="like" className="form-control">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">...</option>
            <option value="both">Both</option>
          </select>
        </Col>

        <Col md={12}>
        <label>
          Age:
          </label>
          <input type="text" name="age" id="age" className="form-control"/>
        </Col>

        <Col md={12}>
        <label>
          #tags:
          </label>
          <input type="text" name="tag" id="tag" className="form-control"/>
        </Col>

        </Row>


        <Row className="form-group">
          <Col md={12}>
          <label> _ </label>
          <Button className="btn-block" bsStyle="primary" bsSize="large" active type="submit" value="Submit">Register</Button>
          </Col>
        </Row>


      <input type="submit" value="Submit" />
      </form>

    </Col>

    <Col xs={1} md={1}>
    </Col>


  </div>




  </div>


    );
  }
}
