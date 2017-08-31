import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {checkTokenIsSet, getMyPeople, tellTheWorldimConnected} from '../helpers/loginHelpers';
import Header from "./Header";
import Footer from "./Footer";
import Video from "./Video";
import Mapping from "./Mapping";
import socketIOClient from "socket.io-client";


class FindPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var socket = this.props.route.socket;
        checkTokenIsSet('map')
        .then((res) => {
            this.state.myInfo = res.data.user;
            this.setState({myInfo: res.data.user});
            return res.data.user
        })
        .then(getMyPeople)
        .then((res) => {
            var myPeople = res.data;
            this.setState({people: myPeople});
            return this.state.myInfo;
        })
        .then((user) => {
            socket.emit('userConnecting', user._id);
            tellTheWorldimConnected(user, this.props.route.socket);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const title="test props mapping";
        if (this.state.myInfo && this.state.people) {
            return (
                <div className='mybody'>
                    <Header title={title} myInfo={this.state.myInfo}>
                    </Header>
                    <Mapping myInfo={this.state.myInfo} people={this.state.people}>
                    </Mapping>
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

export default FindPeople;
