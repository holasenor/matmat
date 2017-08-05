import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import * as tools from '../../helpers/loginHelpers.js';
import {browserHistory} from "react-router";

// .then(tools.checkUser)
export default class Login extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        tools.validateTarget(e.target)
        .then(tools.validateEmail)
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
        tools.validateModalTarget(e.target)
        .then(tools.validateEmail)
        .then(tools.validatePassword)
        .then(tools.sendMail)
        .then((asdf) => {
            console.log(asdf);
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
                        <Button className="btn-block" bsStyle="info" bsSize="small" active onClick={(e) => this.handleResetPassword(e)}>
                            forget password
                        </Button>
                    </div>
                </div>
            </div>)
        }
    }
