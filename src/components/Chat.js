import React from "react"
import Title from "./Header/Title";
import { Col, Button, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {browserHistory} from "react-router";
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client'
import { getMyVisitorsInfo } from "./../helpers/mainHelper.js";
var $ = require("jquery");

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myInfo: this.props.myInfo,
            socket: this.props.socket,
            chatUserId: this.props.chatUserId
        };
    }

    componentDidMount () {

    }

    getVisitors( ) {
        getMyVisitorsInfo(listchatter)
        .then((result) => {
            this.setState({listchatter: result});
            // console.log(this.state.myVisitorsInfo);
        });
    }

    handleSubmit = event => {

    }

    up(e) {
        $('#downChat').fadeIn();
        $('.messages').fadeIn();
        $('#upmessages').fadeOut();
    }

    renderListChat(object, key) {
        var srcList = "https://cdn.intra.42.fr/users/medium_default.png";
        return (
            <MenuItem key={key} eventKey={key} className="showVisitors">
                <img className="avatarVisitor" src={srcList}>
                </img>
                <span>
                    {object} | {key}
                </span>
            </MenuItem>

        );
    }

    listChatter() {
        if (this.state.myInfo) {
            var listChatter = [];
            var likes = this.state.myInfo.likes;
            var likedby = this.state.myInfo.likedBy;
            for (var i = 0; i < likes.length; i++) {
                likes[i]
                for (var j = 0; j < likedby.length; j++) {
                    if (likedby[j] == likes[i]) {
                        listChatter.push(likes[i]);
                    }
                }
            }
        }
        var grid = [];

        for (var i = 0; i < listChatter.length; i++) {
            grid.push(this.renderListChat(listChatter[i], i));
        }
        return listChatter;

    }

    renderOlderMessagesIfAny() {

    }

    handleSendMessage(e) {
        e.preventDefault();
        var messageToSend = $('#messageToSend').val().trim();
        console.log('sending message', messageToSend);
        var message = {
            chatUserId: this.state.chatUserId,
            message: messageToSend
        }
        this.state.socket.emit('chatMessage', message);
    }

    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    width={300}//mettre au max a 90% de la largeur
                    open={this.props.isChatOpen}
                    onRequestChange={() => {this.props.closeChat()}}>
                    {this.renderOlderMessagesIfAny()}
                    <form onSubmit={(e) => {this.handleSendMessage(e)}}>
                    <input type='text' placeholder='write your message' className="form-control" id='messageToSend'>
                    </input>
                </form>
                </Drawer>
            </div>
        );
    }
}
