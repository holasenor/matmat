import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Inscription from "./MainMenu/Inscription";
import Login from "./MainMenu/Login";
import Footer from "./Footer";
import RightBar from "./Mapping/RightBar";
import Container from "./Mapping/Container";


export default class Mapping extends React.Component {
	constructor() {
		super();
		this.state = {login: "Admin"};
	}


	initialize() {
	    var mapOptions = {
	        zoom: 6,
	        center: new google.maps.LatLng(48,2),
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        disableDefaultUI: true,
	        scrollwheel: false
	    }
	    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	    setMarkers(map, villes);
	}

	setMarkers(map, locations) {
	    var image = 'factory.png';
	    for (var i = 0; i < locations.length; i++) {
	        var villes = locations[i];
	        var myLatLng = new google.maps.LatLng(villes[1], villes[2]);
	        var infoWindow = new google.maps.InfoWindow();
	        var marker = new google.maps.Marker({
	            position: myLatLng,
	            map: map,
	            animation: google.maps.Animation.DROP,
	            icon: image
	        });
	        (function(i) {
	            google.maps.event.addListener(marker, "click", function() {
	                var villes = locations[i];
	                infoWindow.close();
	                infoWindow.setContent("<div id='boxcontent' style='font-family:Calibri'><strong style='color:green'>"
	                    + villes[0] +
	                    "</strong><span style='font-size:12px;color:#333'>Ceci est un test.</span></div>"
	                );
	                infoWindow.open(map, this);
	            });
	        })(i);
	    }
	}

	render() {


			const myJson = {
				"data":[
					{"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "Lat":"48.583148","Lng":"7.747882", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg"},
					{"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "Lat":"48.856614","Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg"},
					{"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "Lat":"45.764043","Lng":"4.83565", "photo":"https://cdn.intra.42.fr/users/medium_eozdek.jpg"},
					{"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"female", "Lat":"46.764043","Lng":"4.83565", "photo":"https://cdn.intra.42.fr/users/medium_jaubard.jpg"},
					{"pseudo":"Peter", "email":"Jones@test.com", "age":"58","sexe":"male", "like":"male", "Lat":"45.764043","Lng":"5.83565", "photo":"https://cdn.intra.42.fr/users/medium_stoussay.jpg"}
				]
			};

		return (


			<div className="mapping">

				{this.state.login}
				<div id="gtco-header" className="gtco-cover gtco-cover-md">
					<Col md={12}>
						<Row className="row-mt-15em">
							<Col md={8} className="iframe-rwd">
								<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.99644161674!2d2.3164233154388487!3d48.89640497929127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fa9e73a1ef7%3A0x4e808812dd36a382!2zw4ljb2xlIDQy!5e0!3m2!1sfr!2sfr!4v1501454455266" width="100%" height="inherit" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
							</Col>
							<Col md={4}>
								<RightBar />
							</Col>
						</Row>
					</Col>
				</div>
				<div> _ </div>{/*pour le debug Footer, sinon virer le footer*/}
				<Footer />
			{/* <Container /> */}

		</div>


);
}
}

// AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo
