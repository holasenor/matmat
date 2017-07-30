import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class Inscription extends React.Component {
  render() {
    return (


  <div className="inscription">

  <div >
      <form action="#" >
      <Row>
      <Col md={12}>
      <label>
        Pseudo:
        </label>
        <input type="text" name="pseudo" id="pseudo" className="form-control"/>
      </Col>
      <Col md={12}>
      <label>
        em@il:
        </label>
        <input type="text" name="email" id="email" className="form-control"/>
      </Col>
      <Col md={12}>
      <label>
        Password:
        </label>
        <input type="text" name="password" id="password" className="form-control"/>
      </Col>
      <Col md={6}>
          <label>Gender</label>
          <select name="#" id="sexe" className="form-control">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">...</option>
          </select>
        </Col>
      <Col md={6}>
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

    </div>






  </div>


    );
  }
}
