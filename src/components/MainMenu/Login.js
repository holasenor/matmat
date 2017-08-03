import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import * as tools from '../../helpers/loginHelpers.js';
import {browserHistory} from "react-router";

export default class Login extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        tools.validateTarget(e.target)
        .then(tools.checkUser)
        .then(tools.signIn)
        .then(() => {
            browserHistory.push("/map");
        })
        .catch((err) => {
            alert(err);
        })
    }

    render() {
        return (
            <div className="login">
                <div >
                    <form onSubmit={(e) => this.handleSubmit(e)}>
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
                                <input type="password" name="password" id="password" className="form-control">
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
                        <a href="https://www.w3schools.com">
                        forget password
                    </a>
                </div>
            </div>
        </div>)
    }
}
