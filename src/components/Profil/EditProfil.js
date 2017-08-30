import React, { Component } from 'react';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, InputGroup, FormGroup, Addon, FormControl, ProgressBar, bsStyle} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {getData, updateUser, deleteUser, validateFileSize, validateFileExtension, uploadFile, checkMimeType} from '../../helpers/editHelper.js';
import $ from "jquery";
import {browserHistory} from "react-router";
import * as tools from '../../helpers/loginHelpers.js';
import {checkTokenIsSet, validateEmail} from "../../helpers/loginHelpers.js";
import Header from "../Header";
import Footer from "../Footer";
import Slider from 'react-slick';

class EditProfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateFileSize = validateFileSize.bind(this);
        this.validateFileExtension = validateFileExtension.bind(this);
    }


    renderPhotoBlock() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        var pictures = ["https://www.shareicon.net/download/2016/02/13/293861_msn_256x256.png"];
        if (this.state.myInfo && this.state.myInfo.pictures && this.state.myInfo.pictures[0]) {
            var pictures = this.state.myInfo.pictures;
        }
        return (
            <Col md={5}>
                <div className="gtco-contact-info">
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
                    <h3>
                        Your photo
                    </h3>
                    <Slider {...settings}>
                        {pictures.map((picture, i) => <img key={i} id="profilePicture" src={"http://localhost:3000/images/uploads/" + picture}></img>)}
                    </Slider>
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
                    <input type="text" id="pseudo" className="form-control" placeholder="Your Login" defaultValue={this.state.myInfo.pseudo}>
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
                            <FormControl id="email" type="text" defaultValue={this.state.myInfo.email}>
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
            print.push(<option key={i} value={options[i]}>{capitalizeFirstLetter(options[i])}</option>);
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
                    <select id="sexe" className="form-control" defaultValue={this.state.myInfo.gender}>
                        {this.renderOptions(['male', 'female','...'])}
                    </select>
                </Col>
                <Col md={6} xs={6}>
                    <label>
                        Like
                    </label>
                    <select id="like" className="form-control" defaultValue={this.state.myInfo.like}>
                        {this.renderOptions(['male', 'female','...','both'])}
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
                                <input id="location" type="checkbox" aria-label="..." >
                                </input>
                            </InputGroup.Addon>
                            <FormControl type="text" defaultValue={this.state.myInfo.town}>
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
                    <input type="text" id="tags" className="form-control" placeholder="Yours tags" defaultValue={this.state.myInfo.tag}>
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
                    <textarea name="message" id="message" cols="30" rows="3" maxLength="150" className="form-control" placeholder="Write something fun" defaultValue={this.state.myInfo.bio}>
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
                    <input type="button" value="Delete Account" className="btn btn-danger" onClick={() => this.handleDeleteAccount(this.state.myInfo.email)}>
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
                    <input type="password" id="subject" className="form-control" placeholder="new password">
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

    // .then(this.validateFileExtension)
    handleSubmit(e) {
        e.preventDefault();
        getData(e.target)
        .then(tools.isMailValid)
        .then((infos) => {
            if (infos.password) {
                return tools.validatePassword(infos);
            }
            else {
                return infos;
            }
        })
        .then(tools.validateGender)
        .then(tools.validateLike)
        .then(tools.validateBio)
        .then((infos) => {
            if (infos.pseudo == this.state.myInfo.pseudo) {
                return infos;
            }
            else {
                return tools.validatePseudo(infos);
            }
        })
        .then((infos) => {
            if (infos.email == this.state.myInfo.email) {
                return infos;
            }
            else {
                return tools.validateEmail(infos);
            }
        })
        .then(tools.validateTags)
        .then(this.validateFileSize)
		.then(checkMimeType)
        .then(uploadFile)
        .then(updateUser)
        .then((res) => {
            console.log('pushiiing');
            // browserHistory.push({pathname: "/map", state: res.data});
        })
        .catch((err) => {
            alert(err);
        });
    }

    handleDeleteAccount(mail) {
        deleteUser()
        .catch((err) => {
            alert(err);
        });;
    }

    componentDidMount() {
        checkTokenIsSet('map')
        .then((res) => {
            this.setState({myInfo: res.data.user});
        })
        .catch((err) => {
            console.log('asd', err);
        });
    }

    render() {
        if (this.state.myInfo) {
            return (
                <div className='mybody'>
                    <div className='mybody'>
                        <Header myInfo={this.state.myInfo}>
                        </Header>
                        <div id="page">
                            <div className="page-inner">
                                <div className="gtco-section border-bottom">
                                    <div className="gtco-container">
                                        <Row>
                                            <Col md={12} >
                                                <Col md={7}>
                                                    <h3>
                                                        Profil
                                                    </h3>
                                                    <form id='formUpdate' onSubmit={(e) => this.handleSubmit(e)}>
                                                        {this.renderLogin()}
                                                        {this.renderMail()}
                                                        {this.renderPassAndUpload()}
                                                        {this.renderGenderAndLike()}
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
                </div>
            );
        }
        else {
            return (
                <div className='mybody'>
                </div>
            );
        }
    }
}

export default EditProfil;
