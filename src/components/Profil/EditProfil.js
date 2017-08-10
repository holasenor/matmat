import React, { Component } from 'react';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, InputGroup, FormGroup, Addon, FormControl, ProgressBar, bsStyle} from 'react-bootstrap';
import { Button } from 'react-bootstrap';


import Header from "../Header";
import Footer from "../Footer";



class EditProfil extends React.Component {
  constructor() {
    super();
    this.state = {
		name: "Pedro state",
		myProfil : "coucou",
		// myProfil : {"key":"1",  "id":"1",  "chat":"[11, 2, 3]", "pseudo":"Profil.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active", "popularity":"35"},
	}
  }

  render() {
    return (
      <div className='mybody'>
      <Header />

      <div id="page">

      <div className="page-inner">

      <div className="gtco-section border-bottom">
        <div className="gtco-container">
          <Row>
            <Col md={12} >
              <Col md={7 }>
              <h3>Profil</h3>
              <form action="#">
                <Row className="form-group">
                  <Col md={12}>
                    <label>Login</label>
                    <input type="text" id="name" className="form-control" placeholder="Your Login"/>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12} >
                    <label>Email</label>
                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon>@</InputGroup.Addon>
                        <FormControl type="text" />
                      </InputGroup>
                    </FormGroup>                  </Col>
                </Row>
                <Row className="form-group">
                <Col md={6} xs={6}>
                <label>New password</label>
                <input type="password" id="subject" className="form-control" placeholder="Yours tags"/>
                </Col>
                <Col md={6} xs={6}>
                <label>Photo</label>
                <input type="file" id="photo" className=""/>
                </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6} xs={6}>
                      <label>Gender</label>
                      <select name="#" id="sexe" className="form-control">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="none">...</option>
                      </select>
                  </Col>
                  <Col md={6} xs={6}>
                      <label>Like</label>
                      <select name="#" id="like" className="form-control">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="none">...</option>
                        <option value="both">Both</option>
                      </select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12} >
                    <label>Location</label>
                    {/*<input type="text" id="location" className="form-control" placeholder="Your location"/>*/}
                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon>
                          <input id="location" type="checkbox" aria-label="..." />
                        </InputGroup.Addon>
                        <FormControl type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12} >
                    <label>#Tags</label>
                    <input type="text" id="subject" className="form-control" placeholder="Yours tags"/>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12} >
                    <label>Bio</label>
                    <textarea name="message" id="message" cols="30" rows="5" className="form-control" placeholder="Write something fun"></textarea>
                  </Col>
                </Row>
                <Col md={12} className="center">
                  <div className="form-group">
                    <input type="submit" value="Modify" className="btn btn-primary"/>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Delete" className="btn btn-danger"/>
                  </div>
                </Col>
              </form>
              </Col>
            <Col md={5} >
              <div className="gtco-contact-info">
                <h3>Your photo</h3>
                <img className="" src={"https://cdn.intra.42.fr/users/medium_oseng.jpg"}  />
                <ul>
                  <li className="tags"><a href="tel://1234567920">tous les #tags</a></li>
                  <li className="popularity"><a href="tel://1234567920">populatity</a> 78%</li>
                </ul>
                <div><ProgressBar bsStyle='success' now={78} active/></div>
              </div>
            </Col>
            </Col>
          </Row>
        </div>
      </div>

      </div>

      </div>


	  <Footer />
      </div>


    );
  }
}

export default EditProfil;
