import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, OverlayTrigger, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';


// const AnyReactComponent = ({  img_src }, { lat }, { key }) => <div className="InfoWindow"><img id={key} src={img_src} className="photoOnMap" style={{}} value={lat}/><div>coucou{key}</div></div>;
const AnyReactComponent = ({  marker }) => <div className="mapPhotoLover"><img id={marker.key} src={marker.img_src} className="photoOnMap" style={{}} value={marker.lat} /><div>{marker.pseudo}, {marker.age}</div></div>;

export default class MyMap extends Component {
  constructor(props){
    super(props);
    this.state = {
        markers: [],
        showModal: false,
        idModal: 1,
        myJson: this.props.myJson,
        Lng: this.props.myJson[0].lng
      };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  static defaultProps = {
    center: {lat: 48.8965531, lng: 2.3163470},
    zoom: 11
  }

	markerClicked(marker) {
    console.log("The marker that was clicked is", marker);
    // you may do many things with the "marker" object, please see more on tutorial of the library's author:
   // https://github.com/istarkov/google-map-react/blob/master/API.md#onchildclick-func
   // Look at their examples and you may have some ideas, you can also have the hover effect on markers, but it's a bit more complicated I think
  }

  // renderPhotos(array) {
  //   console.log(array);
  //   // var grid = [];
  //   // for (var i = 0; i < array.length; i++) {
  //   //   grid.push(this.renderPhoto(array[i], i, array));
  //   // }
  //   // return grid;
  // }

  componentDidMount(){
    // console.log(this.state.myJson);
    // console.log(this.state.Lng);
    // or you can set markers list somewhere else
    // please also set your correct lat & lng
    // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
    this.setState({
      markers: this.state.myJson,
      // markers: [
			// 	{key: 1, lat: 48.9065530, lng: 2.1163460, img_src: 'https://cdn.intra.42.fr/users/medium_oseng.jpg'},
			// 	{key: 2, lat: 48.9965533, lng: 2.3163477, img_src: 'https://cdn.intra.42.fr/users/medium_pguzman.jpg' },
      //   {"key":"5", "pseudo":"FindPeople.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "img_src":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active"},
      //   {"key":"6", "pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "lat":"38.856614", "lng":"7.352222", "img_src":"https://cdn.intra.42.fr/users/medium_aribeiro.jpg", "bio":"En recherche active"},
      //   {"key":"7", "pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"female", "like":"female", "lat":"45.956614" , "lng":"2.352222", "img_src":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
      //   {key: 3, lat: 48.8965538, lng: 2.3163475,  img_src: 'https://cdn.intra.42.fr/users/medium_eozdek.jpg'}
			// ],
    });
  }

  close() {
    // this.setState({ showModal: false });
  }

  open() {
    console.log("azerty");
    // this.setState({ showModal: true });
  }

  render() {

// console.log(this.props.myJson.myData)

    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={{height: '100em'}}
      >
            {this.state.markers.map((marker, i) =>{
              return(
                <AnyReactComponent
									key={marker.key}
                  lat={marker.lat}
                  lng={marker.lng}
                  img_src={marker.img_src}
									marker={marker}
									onChildClick={this.markerClicked.bind(this, marker)}
									style={{height: '2em'}}
									className='photoOnMap'
                />
              )
            })}
      </GoogleMapReact>
    );
  }
}
// MyMap.defaultProps = {
//   // center: {lat: this.state.Lat, lng: this.state.Lng},
//   // center: {lat: 48.8965531, lng: 2.3163470},
//   // zoom: 11
// };

// https://stackoverflow.com/questions/43937887/dynamically-adding-markers-on-react-google-map
