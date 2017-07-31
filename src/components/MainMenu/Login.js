import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class Login extends React.Component {
  render() {
    return (


  <div className="login">

  <div >
  <form action="#" >
  <Row>
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
	</Row>
	<Row className="form-group">
	  <Col md={12}>
	  <label>   </label>
	  <Button className="btn-block" bsStyle="primary" bsSize="large" active type="submit" value="Submit">Connexion</Button>
	  </Col>
	</Row>

  <input type="submit" value="Submit" />
  </form>


	  <div>
	  <a href="https://www.w3schools.com">forget password</a>	  </div>

    </div>

  </div>


    );
  }
}
