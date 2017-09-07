import React from "react";
import axios from 'axios';
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Checkbox} from 'react-bootstrap';
import * as tools from '../../helpers/loginHelpers.js';
// import {browserHistory} from "react-router";

export default class Inscription extends React.Component {

    constructor() {
		super();
		this.state = {
            geoloc: false
		};
        this.checkbox = this.checkbox.bind(this);
	}

    handleSubmit(e) {
        e.preventDefault();
        tools.validateTarget(e.target)
        .then((infos) => {infos.geo = this.state.geoloc;return infos})
        .then(tools.validateEmail)
        .then(tools.validatePseudo)
        .then(tools.validatePassword)
        .then(tools.validateGender)
        .then(tools.validateLike)
        .then(tools.validateBio)
        .then(tools.validateAge)
        .then(tools.validateTags)
        .then(tools.getLocation)
        .then(tools.signUp)
        .then(() => {
            this.props.handleSelect(2);
            // browserHistory.push("/map");
        })
        .catch((err) => {
            alert(err);
        });
    }

    checkbox() {
        var tmp = !this.state.geoloc;
        this.setState({geoloc: tmp});
    }

    render() {
        return (
            <div className="inscription">
                <div >
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <Row>
                            <Col md={12}>
                                <label>
                                    Pseudo:
                                </label>
                                <input type="text" name="pseudo" id="pseudo" className="form-control">
                                </input>
                            </Col>
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
                            <Col md={6}>
                                <label>
                                    Gender
                                </label>
                                <select name="gender" id="sexe" className="form-control">
                                    <option value="male">
                                        Male
                                    </option>
                                    <option value="female">
                                        Female
                                    </option>
                                    <option value="none">
                                        ...
                                    </option>
                                </select>
                            </Col>
                            <Col md={6}>
                                <label>
                                    Like
                                </label>
                                <select name="like" id="like" className="form-control">
                                    <option value="male">
                                        Male
                                    </option>
                                    <option value="female">
                                        Female
                                    </option>
                                    <option value="both">
                                        Both
                                    </option>
                                </select>
                            </Col>
                            <Col md={12}>
                                <label>
                                    Description:
                                </label>
                                <input type="textarea" name="bio" id="bio" className="form-control">
                                </input>

                            </Col>
                            <Col md={12}>
                                <label>
                                    Age:
                                </label>
                                <input type="text" name="age" id="age" className="form-control">
                                </input>
                            </Col>
                            <Col md={12}>
                                <label>
                                    #tags:
                                </label>
                                <input type="text" name="tag" id="tag" className="form-control">
                                </input>
                            </Col>
                            <Col md={12}>
                                <Checkbox name="geo" onChange={this.checkbox}>
                                    I want you to know where i am!
                                </Checkbox>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Button className="btn-block" bsStyle="primary" bsSize="large" active type="submit" value="Submit">
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        );
    }
}
