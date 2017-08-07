import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class Research extends React.Component {
	render() {
    return (


 <div>

  <div >
      <form action="#">
      <Row>
	  <Col md={6}>
		  <label>Like</label>
			  <select name="#" id="sexe" className="form-control">
			  <option value="male">Male</option>
			  <option value="female">Female</option>
			  <option value="both">both</option>
		  </select>
	  </Col>
	  <Col md={6}>
	  <label>disance</label>
		  <select name="#" id="like" className="form-control">
			  <option value="10">10km</option>
			  <option value="20">20km</option>
			  <option value="50">50km</option>
			  <option value="100">100km</option>
		  </select>
	  </Col>
      <Col md={6}>
      <label>
        Pseudo:
        </label>
        <input type="text" name="pseudo" id="pseudo" className="form-control"/>
      </Col>
      <Col md={6}>
        <label>
          #tags:
          </label>
          <input type="text" name="tag" id="tag" className="form-control"/>
        </Col>
    	</Row>

        <Row className="form-group">
          <Col md={12}>
          <label>   </label>
          <Button className="btn-block" bsStyle="primary" bsSize="large" active type="submit" value="Submit">Search</Button>
          </Col>
        </Row>
      </form>
    </div>


  </div>


    );
  }
}
