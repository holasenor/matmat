import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, SplitButton, ToggleButton} from 'react-bootstrap';


export default class Research extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			glyphiconSortLocation: "glyphicon glyphicon-sort-by-attributes",
			glyphiconSortAge: "glyphicon glyphicon-sort-by-attributes",
			glyphiconSortPopularity: "glyphicon glyphicon-sort-by-attributes",
			glyphiconSortTags: "glyphicon glyphicon-sort-by-attributes",
			glyphiconSelectLocation: "",
			glyphiconSelectAge: "",
			glyphiconSelectPopularity: "",
			glyphiconSelectTags: "",
		};
		this.sortLocation = this.sortLocation.bind(this);
		this.sortAge = this.sortAge.bind(this);
		this.sortPopularity = this.sortPopularity.bind(this);
		this.sortTags = this.sortTags.bind(this);
	}

	sortLocation() {
		if (this.state.glyphiconSortLocation == "glyphicon glyphicon-sort-by-attributes") {
			this.setState({ glyphiconSortLocation: "glyphicon glyphicon-sort-by-attributes-alt"});
		}
		else {
			this.setState({ glyphiconSortLocation: "glyphicon glyphicon-sort-by-attributes" });
		}
		this.setState({ glyphiconSelectLocation: "glyphicon glyphicon-triangle-left" });
		this.setState({ glyphiconSelectAge: "" });
		this.setState({ glyphiconSelectPopularity: "" });
		this.setState({ glyphiconSelectTags: "" });

	}

	sortAge() {
		if (this.state.glyphiconSortAge == "glyphicon glyphicon-sort-by-attributes") {
			this.setState({ glyphiconSortAge: "glyphicon glyphicon-sort-by-attributes-alt"});
		}
		else {
			this.setState({ glyphiconSortAge: "glyphicon glyphicon-sort-by-attributes" });
		}
		this.setState({ glyphiconSelectLocation: "" });
		this.setState({ glyphiconSelectAge: "glyphicon glyphicon-triangle-left" });
		this.setState({ glyphiconSelectPopularity: "" });
		this.setState({ glyphiconSelectTags: "" });
	}


	sortPopularity() {
		if (this.state.glyphiconSortPopularity == "glyphicon glyphicon-sort-by-attributes") {
			this.setState({ glyphiconSortPopularity: "glyphicon glyphicon-sort-by-attributes-alt"});
		}
		else {
			this.setState({ glyphiconSortPopularity: "glyphicon glyphicon-sort-by-attributes" });
		}
		this.setState({ glyphiconSelectLocation: "" });
		this.setState({ glyphiconSelectAge: "" });
		this.setState({ glyphiconSelectPopularity: "glyphicon glyphicon-triangle-left" });
		this.setState({ glyphiconSelectTags: "" });
	}

	sortTags() {
		if (this.state.glyphiconSortTags == "glyphicon glyphicon-sort-by-attributes") {
			this.setState({ glyphiconSortTags: "glyphicon glyphicon-sort-by-attributes-alt"});
		}
		else {
			this.setState({ glyphiconSortTags: "glyphicon glyphicon-sort-by-attributes" });
		}
		this.setState({ glyphiconSelectLocation: "" });
		this.setState({ glyphiconSelectAge: "" });
		this.setState({ glyphiconSelectPopularity: "" });
		this.setState({ glyphiconSelectTags: "glyphicon glyphicon-triangle-left" });
	}

	render() {
		return (
			<div>
				<div >
					<form action="#">
						<Row>
							<Col md={6}>
								<label>Like</label>
								<select name="#" id="sexe" className="form-control">
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="both">both</option>
								</select>
							</Col>
							<Col md={6}>
								<label>disance</label>
								<select name="#" id="like" className="form-control">
									<option value="10">10km</option>
									<option value="20">20km</option>
									<option value="50">50km</option>
									<option value="100">100km</option>
								</select>
							</Col>
							<Col md={6}>
								<label>
									Pseudo:
								</label>
								<input type="text" name="pseudo" id="pseudo" className="form-control"/>
							</Col>
							<Col md={6}>
								<label>
									#tags:
								</label>
								<input type="text" name="tag" id="tag" className="form-control"/>
							</Col>
						</Row>

						<Row className="form-group">
							<Col md={12}>
								<label>   </label>
								<Button className="btn-block" bsStyle="primary" bsSize="large" active type="submit" value="Submit">Search</Button>
							</Col>
						</Row>
					</form>
				</div>


				{/* âge, localisation, popularité et par tags en */}
				<Row>
					<Col md={3}>
						<div title="Location" id="SortLocation" name="SortLocation" onClick={this.sortLocation}>
							Location <span className={this.state.glyphiconSortLocation}></span>
							<span className={this.state.glyphiconSelectLocation}></span>
						</div>
					</Col>
					<Col md={3}>
						<div title="Age" id="SortAge" name="SortAge" onClick={this.sortAge}>
							Age <span className={this.state.glyphiconSortAge}></span>
							<span className={this.state.glyphiconSelectAge}></span>
						</div>
					</Col>
					<Col md={3}>
						<div title="Popularity" id="SortPopularity" name="SortPopularity" onClick={this.sortPopularity}>
							Popularity <span className={this.state.glyphiconSortPopularity}></span>
							<span className={this.state.glyphiconSelectPopularity}></span>
						</div>
					</Col>
					<Col md={3}>
						<div title="Tags" id="SortTags" name="SortTags" onClick={this.sortTags}>
							Tags <span className={this.state.glyphiconSortTags}></span>
							<span className={this.state.glyphiconSelectTags}></span> 
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
