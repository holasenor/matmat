import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, OverlayTrigger, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';

const Person = ({  marker }) => <div className="mapPhotoLover"><img id={marker.key} src={marker.img_src} className="photoOnMap" style={{}} value={marker.lat} /><div>{marker.pseudo}, {marker.age}</div></div>;

export default class MyMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            center: this.props.center,
            zoom: this.props.zoom
        };
    }

    renderPeople() {
        var myPeople = this.props.myPeople;
        return myPeople.map((marker, i) =>{
            marker.img_src = 'images/uploads/default.jpg';
            if (marker.pictures && marker.pictures[0]) {
                marker.img_src = 'images/uploads/' + marker.pictures[0];
            }
            return(
                <Person
                    key={i}
                    lat={marker.lat}
                    lng={marker.lng}
                    marker={marker} />
            )
        })
    }

    render() {
        return (
            <GoogleMapReact
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
                style={{height: '100em'}}
                >
                {this.renderPeople()}
            </GoogleMapReact>
        );
    }
}
// https://stackoverflow.com/questions/43937887/dynamically-adding-markers-on-react-google-map
