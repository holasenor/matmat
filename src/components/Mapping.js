import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Inscription from "./MainMenu/Inscription";
import Login from "./MainMenu/Login";
import {checkTokenIsSet} from "../helpers/loginHelpers.js";

export default class Mapping extends React.Component {


    render() {
        checkTokenIsSet('map');
        return (
            <div className="mapping">
                <div id="gtco-header" className="gtco-cover gtco-cover-md">

                    <Col md={12}>
                        <Row className="row-mt-15em">
                            <Col md={8} className="iframe-rwd">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.99644161674!2d2.3164233154388487!3d48.89640497929127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fa9e73a1ef7%3A0x4e808812dd36a382!2zw4ljb2xlIDQy!5e0!3m2!1sfr!2sfr!4v1501454455266" width="100%" height="inherit" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
                        </Col>
                        <Col md={4}>
                            <div className="form-wrap">
                                <div className="tab">
                                    <div className="tab-content">
                                        <div className="tab-content-inner active" data-content="signup">
                                            <h3>Book Your Trip</h3>
                                        <form action="#">
                                            <Row className="form-group">
                                                <Col md={12}>
                                                    <label>Your Name</label>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col md={12}>
                                                <input type="text" name="password" id="passw" className="form-control"/>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={12}>
                                            <input type="text" name="password" id="passw" className="form-control"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <label>Date Travel</label>
                                    <input type="text" name="password" id="passw" className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <input type="text" name="password" id="passw" className="form-control"/>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    </div>
</div>
</Col>
</Row>
</Col>

</div>
</div>


);
}
}
