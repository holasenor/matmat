import React from "react"
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
            chatUserId: this.props.chatUserId,
            chatPseudoId: this.props.chatPseudoId
        };
    }

    componentDidMount () {
        var socket = this.props.socket;
        var users = [this.state.myInfo._id, this.state.chatUserId];

        socket.emit('getHistory', users);

        socket.on('chatMessage', (chatMessage) => {
            console.log('message received', chatMessage);
            var tempOldMessages = this.state.oldMessages || [];
            tempOldMessages.push(chatMessage);
            this.setState({oldMessages: tempOldMessages});
        });

        socket.on('historyDemanded', (conversation) => {
            console.log('this is the history i demanded ' + conversation);
            this.setState({oldMessages: conversation});
        });
    }

    componentWillUnmount() {
        var socket = this.props.socket;
        // need to do this or the socket of my onmounted component will continue to listen and call this.setState later
        // which generated react Warnings
        socket.off('historyDemanded');
        socket.off('chatMessage');
    }

    chatSocketSetup() {

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

    renderMessage(message, i) {
        var bubbleClass = "bubble bubble--alt";
        if (message.sender == "me") {
            var bubbleClass = "bubble";
        }
        return (
            <div key={i} className={bubbleClass}>
                {message.sender} : {message.text}
            </div>
        );
    }

    renderOlderMessagesIfAny() {
        var messages = this.state.oldMessages;
        var messagesToRender = [];
        if (messages) {
            for (var i = 0; i < messages.length; i++) {
                var message = {};
                if (messages[i].chatUserId == this.state.myInfo._id) {
                    message.sender = 'me';
                }
                else {
                    message.sender = this.state.chatPseudoId;
                }
                message.text = messages[i].message;
                messagesToRender.push(this.renderMessage(message, i));
            }
        }
        return messagesToRender;
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
        this.chatSocketSetup();
        if (this.state.oldMessages && this.props.userModalIsOnline) {
            return (
                <div>
                    <Drawer
                        docked={false}
                        width={300}//mettre au max a 90% de la largeur
                        open={this.props.isChatOpen}
                        onRequestChange={() => {this.props.closeChat()}}>
                        <div className="messagesContainer">
                            {this.renderOlderMessagesIfAny()}
                        </div>
                        <form onSubmit={(e) => {this.handleSendMessage(e)}}>
                            <input type='text' placeholder='write your message' className="form-control" id='messageToSend'>
                            </input>
                        </form>
                    </Drawer>
                </div>
            );
        }
        else {
            return(
            <div>
            </div>
        )
        }
    }
}
