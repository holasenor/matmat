import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, OverlayTrigger, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';

const Person = ({  marker }) => <div className="mapPhotoLover"><img id={marker.key} src={marker.img_src} className="photoOnMap" style={{}} value={marker.lat} /><div>{marker.pseudo}, {marker.age}</div></div>;

export default class MyMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            myPeople: this.props.myPeople
        };
    }

    static defaultProps = {
        center: {lat: 48.8965531, lng: 2.3163470},
        zoom: 11
    }

    renderPeople() {
        return this.state.myPeople.map((marker, i) =>{
            if (marker.pictures) {
                marker.img_src = marker.pictures[0]
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
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                style={{height: '100em'}}
                >
                {this.renderPeople()}
            </GoogleMapReact>
        );
    }
}
// https://stackoverflow.com/questions/43937887/dynamically-adding-markers-on-react-google-map
