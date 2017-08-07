import React from "react"
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6

export default class GMap extends React.Component {

	state = { zoom: 15 };

	static propTypes() {
		// initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
		// initialCenter: 2.3163477, 48.8965533
		initialCenter: this.props.MyJson.data[0]
	}
	// logMyJson() {
	// 	console.log(this.props.myJson);
	// }

	render() {
		return <div className="GMap">
			<div className='UpdatedText'>
				{/* <p>Current Zoom: { this.state.zoom }</p> */}
			</div>
			<div className='GMap-canvas' ref="mapCanvas">
			</div>
		</div>
	}

	// console.log(this.props.initialCenter);
	// console.log(this.props.initialCenter[0]);
// 	for (var i = 0; i < this.props.initialCenter; i++) {
// 		return new google.maps.LatLng(
// 		this.props.initialCenter.lat,
// 		this.props.initialCenter.lng
// 	)
// }

	componentDidMount(myJson) {
		// console.log(myJson);
		for (var i = 0; i < myJson; i++) {
			// console.log(myJson[i]);
	// 		return new google.maps.LatLng(
	// 		this.props.initialCenter.lat,
	// 		this.props.initialCenter.lng
	// 	)
	}
		// create the map, marker and infoWindow after the component has
		// been rendered because we need to manipulate the DOM for Google =(
		this.map = this.createMap()
		this.marker = this.createMarker()
		this.infoWindow = this.createInfoWindow()

		// have to define google maps event listeners here too
		// because we can't add listeners on the map until its created
		google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
	}

	// clean up event listeners when component unmounts
	componentDidUnMount() {
		google.maps.event.clearListeners(map, 'zoom_changed')
	}

	createMap() {
		let mapOptions = {
			zoom: this.state.zoom,
			center: this.mapCenter()
		}
		return new google.maps.Map(this.refs.mapCanvas, mapOptions)
	}

	mapCenter() {
		return new google.maps.LatLng(
			this.props.initialCenter.lat,
			this.props.initialCenter.lng
		)
	}

	createMarker() {
		return new google.maps.Marker({
			position: this.mapCenter(),
			map: this.map
		})
	}

	createInfoWindow() {
		let contentString = "<div class='InfoWindow'><img class='photoOnMap' src='https://cdn.intra.42.fr/users/medium_oseng.jpg'/><div>Hello, I'm here ;-)</div></div>"
		return new google.maps.InfoWindow({
			map: this.map,
			anchor: this.marker,
			content: contentString
		})
	}

	handleZoomChange() {
		this.setState({
			zoom: this.map.getZoom()
		})
	}
}
