import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, OverlayTrigger, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';


// const AnyReactComponent = ({  marker }) => <div className="mapPhotoLover"><img id={marker.key} src={marker.img_src} className="photoOnMap" style={{}} value={marker.lat} /><div>{marker.pseudo}, {marker.age}</div></div>;
const AnyReactComponent = ({  marker }) => <div className="mapPhotoLover"><img src={marker.pictures[0]} className="photoOnMap" style={{}} value={marker.lat} ></img><div>{marker.pseudo}, {marker.age}</div></div>

export default class MyMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            markers: [],
            myPeople: this.props.myPeople
        };
    }

    static defaultProps = {
        center: {lat: 48.8965531, lng: 2.3163470},
        zoom: 11
    }

    renderPeople() {
        var people = this.state.myPeople.map((marker, i) =>{
            console.log(marker);
            marker.pictures = ['https://cdn.intra.42.fr/users/medium_stoussay.jpg'];
            marker.pseudo = 'asdf';
            marker.age = '43';
            return(
                <AnyReactComponent key={i} marker={marker}>
                </AnyReactComponent>
            );
        });
        return people;
    }

    render() {
        console.log('rendering : ', this.state.myPeople);
        if (this.state.myPeople) {

            return (
                <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom} style={{height: '100em'}}>
                    {this.renderPeople()}
            </GoogleMapReact>
        );
    }
    else {
        <div></div>
    }
}
}
// https://stackoverflow.com/questions/43937887/dynamically-adding-markers-on-react-google-map
