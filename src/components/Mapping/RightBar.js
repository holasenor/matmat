import React from "react"
import Research from "./Research"
import { Button, OverlayTrigger, ProgressBar, popover, tooltip, overlay, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';


export default class RightBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			idModal: 1,
			myPeople: this.props.myPeople,
		};
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	renderPhoto(object, key, data) {
		console.log(object.img_src);
		if (!object.img_src) {
			object.img_src = 'http://www.thesourcepartnership.com/wp-content/uploads/2017/05/facebook-default-no-profile-pic-300x300.jpg';
		}
		return (
			<Col md={4} xs={6} key={key} className="center">
				<div className="center">
					{object.pseudo}, {object.age}
				</div>
				<img onClick={(e) => {this.open(e)}} id={key} className="photoThumbnail" src={object.img_src} key={Object.keys(object)} value={key}>
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
							{/* <Button onClick={this.close} className="center">Close</Button> */}
							<Button bsStyle="primary">
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

	renderPhotos(myPeople) {
		var grid = [];
		for (var i = 0; i < myPeople.length; i++) {
			grid.push(this.renderPhoto(myPeople[i], i, myPeople));
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
		return (
			<div className="rightBarMap">
				<div >
					<Research />
				<Row>
					<Col md={12} className="resultPhotos">
						{this.renderPhotos(this.state.myPeople)}
					</Col>
				</Row>
			</div>
		</div>


	);
}
}
