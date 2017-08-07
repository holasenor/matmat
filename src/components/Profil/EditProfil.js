import React, { Component } from 'react';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, InputGroup, FormGroup, Addon, FormControl, ProgressBar, bsStyle} from 'react-bootstrap';
import { Button } from 'react-bootstrap';


import Header from "../Header";
import Footer from "../Footer";



class EditProfil extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Pedro state"
        }
    }

    fillForm() {

    }

    renderPhotoBlock() {
        var picture = "https://cdn.intra.42.fr/users/medium_oseng.jpg";
        return (
            <Col md={5}>
                <div className="gtco-contact-info">
                    <h3>
                        Your photo
                    </h3>
                    <img src={picture}>
                    </img>
                    <ul>
                        <li className="tags">
                            <a>
                                tous les #tags
                            </a>
                        </li>
                        <li className="popularity">
                            <a>
                                populatity
                            </a>
                            78%
                        </li>
                    </ul>
                    <div>
                        <ProgressBar bsStyle='success' now={78} active>
                        </ProgressBar>
                    </div>
                </div>
            </Col>
        )
    }

    renderLogin() {
        return (
            <Row className="form-group">
                <Col md={12}>
                    <label>
                        Login
                    </label>
                    <input type="text" id="name" className="form-control" placeholder="Your Login" defaultValue={this.state.name}>
                    </input>
                </Col>
            </Row>
        )
    }

    renderMail() {
        return (
            <Row className="form-group">
                <Col md={12}>
                    <label>
                        Email
                    </label>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                @
                            </InputGroup.Addon>
                            <FormControl type="text" defaultValue={this.state.email}>
                            </FormControl>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        )
    }

    renderOptions(options) {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        var print = [];
        for (var i = 0; i < options.length; i++) {
            // if (options[i] != this.state.gender) {
            //     print.push()
            // }
            print.push(<option value={options[i]}>{capitalizeFirstLetter(options[i])}</option>);
        }
        return print;
    }
    renderGenderAndLike() {

        return (
            <Row className="form-group">
                <Col md={6} xs={6}>
                    <label>
                        Gender
                    </label>
                    <select name="#" id="sexe" className="form-control">
                            {this.renderOptions(['male', 'female','...'])}
                        </select>
                    </Col>
                    <Col md={6} xs={6}>
                        <label>
                            Like
                        </label>
                        <select name="#" id="like" className="form-control">
                            <option value="male">
                                Male
                            </option>
                            <option value="female">
                                Female
                            </option>
                            <option value="none">
                                ...
                            </option>
                            <option value="both">
                                Both
                            </option>
                        </select>
                    </Col>
                </Row>
            )
        }

        renderLocation() {
            return (
                <Row className="form-group">
                    <Col md={12} >
                        <label>
                            Location
                        </label>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <input id="location" type="checkbox" aria-label="...">
                                    </input>
                                </InputGroup.Addon>
                                <FormControl type="text">
                                </FormControl>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            )
        }

        renderTags() {
            return (
                <Row className="form-group">
                    <Col md={12} >
                        <label>
                            #Tags
                        </label>
                        <input type="text" id="subject" className="form-control" placeholder="Yours tags">
                        </input>
                    </Col>
                </Row>
            )
        }

        renderBio() {
            return (
                <Row className="form-group">
                    <Col md={12} >
                        <label>
                            Bio
                        </label>
                        <textarea name="message" id="message" cols="30" rows="5" className="form-control" placeholder="Write something fun">
                        </textarea>
                    </Col>
                </Row>
            )
        }

        renderButtons() {
            return (
                <Col md={12} className="center">
                    <div className="form-group">
                        <input type="submit" value="Modify" className="btn btn-primary">
                        </input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete" className="btn btn-danger">
                        </input>
                    </div>
                </Col>
            )
        }

        renderPassAndUpload() {
            return (
                <Row className="form-group">
                    <Col md={6} xs={6}>
                        <label>
                            New password
                        </label>
                        <input type="password" id="subject" className="form-control" placeholder="Yours tags">
                        </input>
                    </Col>
                    <Col md={6} xs={6}>
                        <label>
                            Photo
                        </label>
                        <input type="file" id="photo" className="">
                        </input>
                    </Col>
                </Row>
            )
        }

        render() {
            this.fillForm();
            return (
                <div className='mybody'>
                    <Header>
                    </Header>
                    <div id="page">
                        <div className="page-inner">
                            <div className="gtco-section border-bottom">
                                <div className="gtco-container">
                                    <Row>
                                        <Col md={12} >
                                            <Col md={7 }>
                                                <h3>
                                                    Profil
                                                </h3>
                                                <form action="#">
                                                    {this.renderLogin()}
                                                    {this.renderMail()}
                                                    {this.renderPassAndUpload()}
                                                    {this.renderGenderAndLike()}
                                                    {this.renderLocation()}
                                                    {this.renderTags()}
                                                    {this.renderBio()}
                                                    {this.renderButtons()}
                                                </form>
                                            </Col>
                                            {this.renderPhotoBlock()}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default EditProfil;
