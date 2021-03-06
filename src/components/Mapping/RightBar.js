import React from "react"
import Research from "./Research"
import { Button, OverlayTrigger, ProgressBar, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';
import {likeThisId, getMyLikesInfo, addVisit, blockThisId, reportThisId} from "./../../helpers/mainHelper.js";
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
var $ = require("jquery");
import * as tools from '../../helpers/mainHelper.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Chat from "./../Chat";
import moment from 'moment';


injectTapEventPlugin();
const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default class RightBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            idModal: 1,
            buttonBsStyle: 'primary',
            myInfo: this.props.myInfo,
            userModal: {},
            isChatOpen: false,
            userModalIsOnline: false,
            userIsBlocked: true
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.setStyleLikeButton =this.setStyleLikeButton.bind(this);
    }

    handleTouchTap(e, someUser) {
        //need to modify a bit of code so i can call open...... this feature is not really important so i will do it later....
        /// i can do it now, since i removed 3th argument from a function (myPeople[i],i, myPeople)
    }

    doWeLikeEachOther(myInfo) {
        console.log(myInfo.likes);
        console.log(myInfo.likedBy);
        var intersection = _.intersection(myInfo.likes, myInfo.likedBy);
        if (intersection.length) {
            console.log('we like each other');
            return true;
        }
    }

    handleClickLikeButton(id) {
        likeThisId(id)
        .then((res) => {
            var tempMyInfo = this.state.myInfo;
            var matchToModify = {
                id1: tempMyInfo._id,
                id2: id
            };
            if (res.data.message == 'User remove like') {
                var index = tempMyInfo.likes.indexOf(id);
                if (index > -1) {
                    tempMyInfo.likes.splice(index, 1);
                }
                console.log('im gonna destroy our match');
                this.props.socket.emit('userDislikeUser', matchToModify)
                this.props.socket.emit('matchDestruction', matchToModify);
                this.setState({buttonBsStyle: 'primary'});
            }
            else {
                var likeUsers = matchToModify;
                this.props.socket.emit('userLikeUser', likeUsers);
                tempMyInfo.likes.push(id);
                if (this.doWeLikeEachOther(tempMyInfo)) {
                    console.log('they like each other, we are gonna create a room');
                    this.props.socket.emit('matchCreation', matchToModify);
                }
                else {
                    console.log('they don\'t like each other YET');
                }
                this.setState({buttonBsStyle: 'info'});
            }
            this.setState({myInfo: tempMyInfo});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleBlockButton(id) {
        var socket = this.props.socket;
        blockThisId(id)
        .then((res) => {
            if (res.data.success) {
                socket.emit('iJustBlockedThisId', id);
                var tempMyInfo = this.state.myInfo;
                if (res.data.action == 'added') {
                    tempMyInfo.block.push(id);
                    this.setState({myInfo: tempMyInfo});
                    this.props.setMyPeople(this.props.myPeople);
                }
                this.close();
                alert('YOU WILL NEVER SEE HIM AGAIN !!!!');
            }
        })
        .catch((res) => {
            console.log(res);
        })
    }

    handleReportButton(id) {
        this.close();
        reportThisId(id)
        .then((res) => {
            alert(res.data.message);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    setStyleLikeButton(id) {
        var myLikes = this.state.myInfo.likes;
        var objectId = id;
        if (myLikes) {
            if ($.inArray(objectId, myLikes) != -1) {
                this.setState({buttonBsStyle: 'info'})
            }
            else {
                this.setState({buttonBsStyle: 'primary'})
            }
        }
    }

    setClassStatus(user) {
        if (user.online) {
            return "glyphicon glyphicon-globe connected";
        }
        else {
            return "glyphicon glyphicon-globe notConnected";
        }
    }

    handleChatButton(id) {
        this.close();
        this.setState({
            isChatOpen: true
        });
        this.setState({
            chatUserId: id
        });
    }

    renderChatButton(id) {
        var myLikes = this.props.myInfo.likes;
        var likedBy = this.props.myInfo.likedBy;
        var matches = _.intersection(likedBy, myLikes);
        if (matches.includes(id) && this.state.usersOnline.includes(this.state.userIdInModal) && !this.state.userIsBlocked) {
            return (
                <Button bsStyle="success" onClick={() => {this.handleChatButton(this.state.userIdInModal)}}>
                    Chat
                </Button>
            )
        }
    }

    renderLastConnection() {
        var lastConnection;

        if (this.state.lastConnection) {
            lastConnection = this.state.lastConnection;
        }
        if (lastConnection)
            return '        Last seen : ' + lastConnection;
        else {
            return '        Not login yet';
        }
    }

    renderPhoto(object, key) {
        var imgToDisplay = 'images/uploads/default.jpg';
        if (object.img_src) {
            imgToDisplay = 'images/uploads/' + object.img_src;
        }
        var popularityToDisplay = 0;
        if (object.likes) {
            popularityToDisplay = object.likes.length;
        }

        return (
            <Col md={4} xs={6} key={key} className="center">
                <div className="center">
                    {object.pseudo}, {object.age}, <span className={this.setClassStatus(object)}></span>
                </div>
                <img onClick={(e) => {this.open(e, object)}} id={key} className="photoThumbnail" src={imgToDisplay} key={Object.keys(object)} value={key}>
                </img>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title className="center">
                                {this.state.userModal.pseudo} , {this.state.userModal.age}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="photoThumbnail center" src={this.state.modalImage}>
                            </img>
                            <div>
                                Popularity : {popularityToDisplay}
                            </div>
                            <div>
                                <ProgressBar bsStyle='warning' now={parseInt(this.state.userModal.age)} active>
                                </ProgressBar>
                            </div>
                            <div>
                                {this.state.userModal.bio}
                            </div>
                            <div>
                                #tags : {this.state.userModal.tag}
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="center">
                            <Button bsStyle={this.state.buttonBsStyle} onClick={(e) => {this.handleClickLikeButton(this.state.userIdInModal)}}>
                                Like
                            </Button>

                            {this.renderChatButton(this.state.userIdInModal)}

                            <Button bsStyle="danger" onClick={() => {this.handleBlockButton(this.state.userIdInModal)}}>
                                Block
                            </Button>

                            <Button bsStyle="danger" onClick={() => {this.handleReportButton(this.state.userIdInModal)}}>
                                Report
                            </Button>

                        </Modal.Footer>
                        {this.renderLastConnection()}
                    </Modal>
                </div>
            </Col>
        )
    }

    renderLike(myLikesInfo, key) {
        var imageToDisplay = 'images/uploads/default.jpg';
        if (myLikesInfo[key].pictures && myLikesInfo[key].pictures[0]) {
            imageToDisplay = 'images/uploads/' + myLikesInfo[key].pictures[0];
        }
        var object = myLikesInfo[key];
        return (
            <Chip
                onClick={(e) => {
                    this.handleTouchTap(e, myLikesInfo[key]);
                }}
                style={styles.chip}
                key={key}
                >
                    <Avatar src={imageToDisplay}>
                    </Avatar>
                    {myLikesInfo[key].pseudo}
                </Chip>
            );
        }

        renderLikesBar(myLikesInfo) {
            var grid = [];
            for (var i = 0; i < myLikesInfo.length; i++) {
                grid.push(this.renderLike(myLikesInfo, i));
            }
            return grid;
        }

        renderPhotos(myPeople) {
            var usersOnline = this.state.usersOnline;
            if (usersOnline) {
                var grid = [];
                for (var i = 0; i < myPeople.length; i++) {
                    if (usersOnline.indexOf(myPeople[i]._id) == -1) {
                        myPeople[i].online = false;
                    }
                    else {
                        myPeople[i].online = true;
                    }
                    grid.push(this.renderPhoto(myPeople[i], i));
                }
                return grid;
            }
        }

        close() {
            this.setState({ showModal: false });
            this.getLikes();
        }

        open(e, object) {
            var myInfo = this.state.myInfo;
            var userId = object._id;//id de la personne que l'on visite | clique
            var visitorId = myInfo._id;
            var socket = this.props.socket;
            addVisit(userId, visitorId)
            .catch((err) => {
                alert(err);
            });
            var visitObj = {
                userId: userId,
                pseudo: myInfo.pseudo,
                time: Date.now()
            };
            if (myInfo.pictures && myInfo.pictures[0]) {
                visitObj.picture = myInfo.pictures[0];
            }
            socket.emit('iVisitedThisId', visitObj);
            socket.emit('amIBlockedBy', userId);
            socket.emit('getLastConnection', userId);
            var imageToDisplay = 'images/uploads/default.jpg';
            if (object.pictures && object.pictures[0]) {
                imageToDisplay = 'images/uploads/' + object.pictures[0];
            }
            this.setState({modalImage: imageToDisplay})
            this.setState({userModalIsOnline: object.online});
            this.setState({userModal: object});
            this.setStyleLikeButton(object._id);
            this.setState({ userIdInModal: object._id});
            this.setState({ userPseudoInModal: object.pseudo});
            this.setState({ showModal: true });
            this.setState({ idModal: e.target.id });
        }

        componentDidMount() {
            var socket = this.props.socket;
            var usersOnline = this.state.usersOnline;

            socket.on('returnAmIBlockedBy', (res) => {
                if (res.userIdThatBlocked == this.state.chatUserId) {
                    this.closeChat();
                }
                this.setState({userIsBlocked: res.isHeBlocked});
            });

            socket.on('usersOnline', (usersOnline) => {
                this.setState({usersOnline: usersOnline});
            });

            socket.on('userconnection', (userId) => {
                var usersOnline = this.state.usersOnline;
                if (usersOnline.indexOf(userId) == -1) {
                    usersOnline.push(userId);
                }
                this.setState({usersOnline: usersOnline});
            });

            socket.on('userdisconnection', (userId)  => {
                var usersOnline = this.state.usersOnline;
                var index = usersOnline.indexOf(userId);
                if (index != -1) {
                    usersOnline.splice(index, 1);
                }
                if (userId == this.state.chatUserId) {
                    this.closeChat();
                }
                this.setState({usersOnline: usersOnline});
            });

            socket.on('joinThisRoomWithMe', (info) => {
                console.log('i was invited to this room ' + info.roomId);
                socket.emit('joinRoom', info.roomId);
            });

            socket.on('youWereLikedBy', (id) => {
                console.log('likedBy = ' , this.state.myInfo.likedBy);
                console.log('i was liked by ' + id);
                var tempMyInfo = this.state.myInfo;
                if (tempMyInfo.likedBy.indexOf(id) == -1) {
                    tempMyInfo.likedBy.push(id);
                    console.log('so i set new state');
                    this.setState({myInfo: tempMyInfo});
                }
                else {
                    console.log('WEIRD, you were already liked by him');
                }
            });

            socket.on('youWereDislikedBy', (id) => {
                console.log('likedBy = ' , this.state.myInfo.likedBy);
                console.log('i was disliked by' + id);
                var tempMyInfo = this.state.myInfo;
                var index = tempMyInfo.likedBy.indexOf(id);
                if (index != -1) {
                    tempMyInfo.likedBy.splice(index, 1);
                    console.log('new likedBy = ', tempMyInfo.likedBy);
                    console.log('so i set new state');
                    if (this.state.chatUserId == id) {
                        this.setState({isChatOpen: false});
                    }
                    this.setState({myInfo: tempMyInfo});
                }
                else {
                    console.log('WEIRD, you were NOT already liked by him');
                }
            });

            socket.on('lastConnection', (lastConnection) => {
                var time = false;
                if (lastConnection)
                    time = moment.unix(lastConnection / 1000).format('LLL');
                this.setState({lastConnection: time});
            });

            this.getLikes(usersOnline);
        }

        componentWillUnmount() {
            var socket = this.props.socket;
            socket.off('usersOnline');
            socket.off('userconnection');
            socket.off('userdisconnection');
            socket.off('joinThisRoomWithMe');
            socket.off('userconnection');
            socket.off('youWereLikedBy');
            socket.off('youWereDislikedBy');
            socket.off('returnAmIBlockedBy');
        }

        getLikes() {
            getMyLikesInfo(this.state.myInfo.likes)
            .then((myLikesInfo) => {
                this.setState({myLikesInfo: myLikesInfo});
            });
        }

        closeChat = () => {this.setState({isChatOpen: false})}

        renderChat() {
            if (this.state.myInfo && this.state.isChatOpen && this.state.usersOnline) {
                var heIsOnline = this.state.usersOnline.includes(this.state.chatUserId);
                return (
                <Chat myInfo={this.state.myInfo}
                    isChatOpen={this.state.isChatOpen}
                    closeChat={this.closeChat}
                    socket={this.props.socket}
                    chatUserId={this.state.chatUserId}
                    chatPseudoId={this.state.userPseudoInModal}
                    userModalIsOnline={heIsOnline}>
                </Chat>
            );
            }
        }

        render() {
            var myPeople = this.props.myPeople;
            if (this.state.myLikesInfo) {
                return (
                    <div className="rightBarMap">
                    {this.renderChat()}
                        <div>
                            <Research setMyPeople={this.props.setMyPeople} myInfo={this.state.myInfo} myPeople={myPeople}>
                            </Research>
                            <Row>
                                <Col md={12} className="resultPhotos">
                                    {this.renderPhotos(myPeople)}
                                </Col>
                            </Row>
                        </div>
                        <Row className="likesBar" style={styles.wrapper}>
                            {this.renderLikesBar(this.state.myLikesInfo)}
                        </Row>
                    </div>
                );
            }
            else {
                return (
                    <div className="rightBarMap">
                    </div>
                );
            }
        }
    }
