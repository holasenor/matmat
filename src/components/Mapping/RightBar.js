import React from "react"
import Research from "./Research"
import { Button, OverlayTrigger, ProgressBar, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';
import {likeThisId, getMyLikesInfo, addVisit} from "./../../helpers/mainHelper.js";
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
            myPeople: this.props.myPeople,
            buttonBsStyle: 'primary',
            myInfo: this.props.myInfo
        };
        console.log('entering RightBar');
        console.log(this.props.myPeople);
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

    renderPhoto(object, key, data) {
        if (!object.img_src) {
            object.img_src = 'http://www.thesourcepartnership.com/wp-content/uploads/2017/05/facebook-default-no-profile-pic-300x300.jpg';
        }

        return (
            <Col md={4} xs={6} key={key} className="center">
                <div className="center">
                    {object.pseudo}, {object.age}
                </div>
                <img onClick={(e) => {this.open(e, object)}} id={key} className="photoThumbnail" src={object.img_src} key={Object.keys(object)} value={key}>
                </img>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title className="center">
                                {data[this.state.idModal].pseudo} , {data[this.state.idModal].age}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="photoThumbnail center" src={data[this.state.idModal].img_src}>
                            </img>
                            <div>
                                Popularity : {data[this.state.idModal].popularity}
                            </div>
                            <div>
                                <ProgressBar bsStyle='warning' now={parseInt(data[this.state.idModal].age)} active>
                                </ProgressBar>
                            </div>
                            <div>
                                {data[this.state.idModal].bio}
                            </div>
                            <div>
                                #tags : {data[this.state.idModal].email}
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="center">
                            <Button bsStyle={this.state.buttonBsStyle} onClick={(e) => {this.handleClickLikeButton(this.state.userIdInModal)}}>
                                Like
                            </Button>

                            <Button bsStyle="success">
                                Chat
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
        )
    }

    renderLikesBar(myLikesInfo) {
        var grid = [];
        for (var i = 0; i < myLikesInfo.length; i++) {
            grid.push(this.renderLike(myLikesInfo, i));
        }
        return grid;
    }

    renderPhotos(myPeople) {
        var grid = [];
        for (var i = 0; i < myPeople.length; i++) {
            grid.push(this.renderPhoto(myPeople[i], i, myPeople));
        }
        return grid;
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

        this.setStyleLikeButton(object._id);
          this.setState({ userIdInModal: object._id});
        this.setState({ showModal: true });
        this.setState({ idModal: e.target.id });
    }

    componentDidMount() {
        this.getLikes();
    }

    getLikes() {
        getMyLikesInfo(this.state.myInfo.likes)
        .then((myLikesInfo) => {
            this.setState({myLikesInfo: myLikesInfo});
        });
    }

    render() {
        console.log('render was called');
        if (this.state.myLikesInfo) {
            return (
                <div className="rightBarMap">
                    <div>
                        <Research setMyPeople={this.props.setMyPeople} myInfo={this.state.myInfo}>
                        </Research>
                        <Row>
                            <Col md={12} className="resultPhotos">
                                {this.renderPhotos(this.state.myPeople)}
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
