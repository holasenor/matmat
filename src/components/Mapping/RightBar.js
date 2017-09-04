import React from "react"
import Research from "./Research"
import { Button, OverlayTrigger, ProgressBar, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';
import {likeThisId, getMyLikesInfo, addVisit, blockThisId, reportThisId} from "./../../helpers/mainHelper.js";
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
var $ = require("jquery");
import * as tools from '../../helpers/mainHelper.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

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
            userModal: {}
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.setStyleLikeButton =this.setStyleLikeButton.bind(this);
    }

    handleTouchTap(e, someUser) {
        //need to modify a bit of code so i can call open...... this feature is not really important so i will do it later....
    }

    handleClickLikeButton(id) {
        likeThisId(id)
        .then((res) => {
            var tempMyInfo = this.state.myInfo;
            if (res.data.message == 'User remove like') {
                var index = tempMyInfo.likes.indexOf(id);
                if (index > -1) {
                    tempMyInfo.likes.splice(index, 1);
                }
                this.setState({buttonBsStyle: 'primary'});
            }
            else {
                tempMyInfo.likes.push(id);
                this.setState({buttonBsStyle: 'info'});
            }
            this.setState({myInfo: tempMyInfo});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleBlockButton(id) {
        blockThisId(id)
        .then((res) => {
            if (res.data.success) {
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

    renderPhoto(object, key) {
        if (!object.img_src) {
            object.img_src = 'http://www.thesourcepartnership.com/wp-content/uploads/2017/05/facebook-default-no-profile-pic-300x300.jpg';
        }

        return (
            <Col md={4} xs={6} key={key} className="center">
                <div className="center">
                    {object.pseudo}, {object.age}, <span className={this.setClassStatus(object)}></span>
                </div>
                <img onClick={(e) => {this.open(e, object)}} id={key} className="photoThumbnail" src={object.img_src} key={Object.keys(object)} value={key}>
                </img>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title className="center">
                                {this.state.userModal.pseudo} , {this.state.userModal.age}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="photoThumbnail center" src={this.state.userModal.img_src}>
                            </img>
                            <div>
                                Popularity : {this.state.userModal.popularity}
                            </div>
                            <div>
                                <ProgressBar bsStyle='warning' now={parseInt(this.state.userModal.age)} active>
                                </ProgressBar>
                            </div>
                            <div>
                                {this.state.userModal.bio}
                            </div>
                            <div>
                                #tags : {this.state.userModal.email}
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="center">
                            <Button bsStyle={this.state.buttonBsStyle} onClick={(e) => {this.handleClickLikeButton(this.state.userIdInModal)}}>
                                Like
                            </Button>

                            <Button bsStyle="success">
                                Chat
                            </Button>

                            <Button bsStyle="danger" onClick={() => {this.handleBlockButton(this.state.userIdInModal)}}>
                                Block
                            </Button>

                            <Button bsStyle="danger" onClick={() => {this.handleReportButton(this.state.userIdInModal)}}>
                                Report
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </Col>
        )
    }

    renderLike(myLikesInfo, key) {
        var pictures = ['http://www.thesourcepartnership.com/wp-content/uploads/2017/05/facebook-default-no-profile-pic-300x300.jpg'];
        if (myLikesInfo[key].pictures && myLikesInfo[key].pictures[0]) {
            pictures = myLikesInfo[key].pictures;
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
                    <Avatar src={pictures[0]}>
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
            var userId = object._id;//id de la personne que l'on visite | clique
            var visitorId = this.state.myInfo._id;
            addVisit(userId, visitorId)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                alert(err);
            });
            this.setState({userModal: object});
            this.setStyleLikeButton(object._id);
            this.setState({ userIdInModal: object._id});
            this.setState({ showModal: true });
            this.setState({ idModal: e.target.id });
        }

        componentDidMount() {
            var socket = this.props.socket;

            socket.on('usersOnline', (usersOnline) => {
                console.log('server sends me usersOnline');
                console.log(usersOnline);
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
                this.setState({usersOnline: usersOnline});
            });

            this.getLikes();
        }

        getLikes() {
            getMyLikesInfo(this.state.myInfo.likes)
            .then((myLikesInfo) => {
                this.setState({myLikesInfo: myLikesInfo});
            });
        }

        render() {
            var myPeople = this.props.myPeople;
            if (this.state.myLikesInfo) {
                return (
                    <div className="rightBarMap">
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
