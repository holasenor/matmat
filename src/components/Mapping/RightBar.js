import React from "react"
import Research from "./Research"
import { Button, OverlayTrigger, ProgressBar, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';


export default class RightBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			idModal: 1,
			myJson: this.props.myJson,
		};
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	renderPhoto(object, key, data) {
		// console.log("test : "+ object + key);
		return (
				<Col md={4} xs={6} key={key} className="center">
					<div className="center">{object.pseudo}, {object.age}</div>
				<img onClick={(e) => {this.open(e)}} id={key} className="photoThumbnail" src={object.img_src} key={key} value={key}/>
					<div>
						<Modal show={this.state.showModal} onHide={this.close}>
							<Modal.Header closeButton>
								<Modal.Title className="center">{data[this.state.idModal].pseudo} , {data[this.state.idModal].age}</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<img className="photoThumbnail center" src={data[this.state.idModal].img_src}/>
							<div>Popularity : {data[this.state.idModal].popularity}</div>
							{/*} <div><ProgressBar now={60} active/></div>*/}
							<div><ProgressBar bsStyle='warning' now={parseInt(data[this.state.idModal].age)} active/></div>
							<div>{data[this.state.idModal].bio}</div>
							<div>#tags : {data[this.state.idModal].email}</div>
							</Modal.Body>
							<Modal.Footer className="center">
								{/* <Button onClick={this.close} className="center">Close</Button> */}
								<Button bsStyle="primary">Like</Button>
								<Button bsStyle="success">Chat</Button>
							</Modal.Footer>
						</Modal>
					</div>
				</Col>
		)
	}
	renderPhotos(array) {
		var grid = [];
		for (var i = 0; i < array.length; i++) {
			grid.push(this.renderPhoto(array[i], i, array));
		}
		return grid;
	}

  close() {
    this.setState({ showModal: false });
  }

  open(e) {
    this.setState({ showModal: true });
		this.setState({ idModal: e.target.id });
  }


  render() {
{/*}
	  // const myJson = {
		//   "myData":[
		// 	  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "Lat":"48.8965533", "Lng":"2.3185364", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_eozdek.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"female", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_jaubard.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"sergie", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_svelhinh.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"pontoise", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_grass-kw.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"female", "like":"male", "Lat":"48.856614", "Lng":"21.352222", "photo":"https://cdn.intra.42.fr/users/medium_eozdek.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "Lat":"48.856614", "Lng":"21.352222", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"female", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_aribeiro.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"female", "like":"female", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg", "bio":"En recherche active"},
		// 	  {"pseudo":"Peter", "email":"Jones@test.com", "age":"58","sexe":"male", "like":"male", "Lat":"48.756614" , "Lng":"2.952222", "photo":"https://cdn.intra.42.fr/users/medium_stoussay.jpg", "bio":"En recherche active"}
		//   ]
	  // };
	//   console.log(myJson);
	//   console.log(myJson.data[0].pseudo);
	*/}
    return (
	  <div className="rightBarMap">
		  <div >
			  <Research />
			  <Row>
			  	<Col md={12} className="resultPhotos">
						{this.renderPhotos(this.state.myJson)}
	      	</Col>
			  </Row>
	    </div>
	  </div>


    );
  }
}
