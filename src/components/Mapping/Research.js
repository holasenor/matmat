import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Slider from 'rc-slider';
import {getSearchResults, sortPeopleByTags, sortPeopleBy} from '../../helpers/mainHelper.js';
const Range = Slider.Range;
var $ = require("jquery");

const ASCENDING = true;
const DESCENDING = false;

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
		this.state.myInfo = this.props.myInfo;
		this.state.fromAge = 0;
		this.state.toAge = 100;
		this.state.fromPop = 0;
		this.state.toPop = 100;
		this.handleOnChangeAge = this.handleOnChangeAge.bind(this);
		this.handleOnChangePopularity = this.handleOnChangePopularity.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.sortLocation = this.sortLocation.bind(this);
		this.sortAge = this.sortAge.bind(this);
		this.sortPopularity = this.sortPopularity.bind(this);
		this.sortTags = this.sortTags.bind(this);
	}

	handleOnChangeAge(value) {
		this.setState({
			fromAge: value[0],
			toAge: value[1]
		});
	}

	handleOnChangePopularity(value) {
		this.setState({
			fromPop: value[0],
			toPop: value[1]
		});
	}

	getSearchOptions() {
		var form = $('#searchForm');
		var ageInterval = [this.state.fromAge, this.state.toAge];
		var     popularityInterval = [this.state.fromPop, this.state.toPop];
		var distance = form.find('#distance').val();
		var tags = form.find('#tag').val();
		return {
			ageInterval: ageInterval,
			popularityInterval: popularityInterval,
			distance: distance,
			tags: tags
		}
	}

	handleSearch() {
		// use this.props.setMyPeople to change mypeople everywhere
		var options = this.getSearchOptions();
		var myInfo = this.state.myInfo;  // MAYBE CHANGE IT TO this.state.myInfo      --------------------------------------
		getSearchResults(myInfo, options)
		.then((newPeople) => {
			console.log('getting new People');
			console.log(newPeople);
			this.props.setMyPeople(newPeople);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	sortLocation() {
		if (this.state.glyphiconSortLocation == "glyphicon glyphicon-sort-by-attributes") {
			this.setState({ glyphiconSortLocation: "glyphicon glyphicon-sort-by-attributes-alt"});
			var sortedPeople = sortPeopleBy('distance', this.props.myPeople, ASCENDING);
			this.props.setMyPeople(sortedPeople);
		}
		else {
			this.setState({ glyphiconSortLocation: "glyphicon glyphicon-sort-by-attributes" });
			var sortedPeople = sortPeopleBy('distance', this.props.myPeople, DESCENDING);
			this.props.setMyPeople(sortedPeople);
		}
		this.setState({ glyphiconSelectLocation: "glyphicon glyphicon-triangle-left" });
		this.setState({ glyphiconSelectAge: "" });
		this.setState({ glyphiconSelectPopularity: "" });
		this.setState({ glyphiconSelectTags: "" });
	}

	sortAge() {
		if (this.state.glyphiconSortAge == "glyphicon glyphicon-sort-by-attributes") {
			this.setState({ glyphiconSortAge: "glyphicon glyphicon-sort-by-attributes-alt"});
			var sortedPeople = sortPeopleBy('age', this.props.myPeople, ASCENDING);
			this.props.setMyPeople(sortedPeople);
		}
		else {
			this.setState({ glyphiconSortAge: "glyphicon glyphicon-sort-by-attributes" });
			var sortedPeople = sortPeopleBy('age', this.props.myPeople, DESCENDING);

			this.props.setMyPeople(sortedPeople);
		}
		this.setState({ glyphiconSelectLocation: "" });
		this.setState({ glyphiconSelectAge: "glyphicon glyphicon-triangle-left" });
		this.setState({ glyphiconSelectPopularity: "" });
		this.setState({ glyphiconSelectTags: "" });
	}


	sortPopularity() {
		if (this.state.glyphiconSortPopularity == "glyphicon glyphicon-sort-by-attributes") {
			this.setState({ glyphiconSortPopularity: "glyphicon glyphicon-sort-by-attributes-alt"});
			var sortedPeople = sortPeopleBy('popularity', this.props.myPeople, ASCENDING);
			this.props.setMyPeople(sortedPeople);
		}
		else {
			this.setState({ glyphiconSortPopularity: "glyphicon glyphicon-sort-by-attributes" });
			var sortedPeople = sortPeopleBy('popularity', this.props.myPeople, DESCENDING);

			this.props.setMyPeople(sortedPeople);
		}
		this.setState({ glyphiconSelectLocation: "" });
		this.setState({ glyphiconSelectAge: "" });
		this.setState({ glyphiconSelectPopularity: "glyphicon glyphicon-triangle-left" });
		this.setState({ glyphiconSelectTags: "" });
	}

	sortTags() {
		var myTags = this.props.myInfo.tag;

		if (this.state.glyphiconSortTags == "glyphicon glyphicon-sort-by-attributes") {
			this.setState({ glyphiconSortTags: "glyphicon glyphicon-sort-by-attributes-alt"});
			var sortedPeople = sortPeopleByTags(myTags, this.props.myPeople, ASCENDING);
			this.props.setMyPeople(sortedPeople);
		}
		else {
			this.setState({ glyphiconSortTags: "glyphicon glyphicon-sort-by-attributes" });
			var sortedPeople = sortPeopleByTags(myTags, this.props.myPeople, DESCENDING);
			this.props.setMyPeople(sortedPeople);
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
					<form id="searchForm" action="#" onSubmit={(e) => {e.preventDefault();this.handleSearch();}}>
						<Row>
							<Col md={6}>
								<label>
									Age
								</label>
								<Range allowCross={false} defaultValue={[0, 100]} onChange={this.handleOnChangeAge}>
								</Range>
								<label>
									from {this.state.fromAge} to {this.state.toAge} years old
								</label>
							</Col>
							<Col md={6}>
								<label>
									Popularity
								</label>
								<Range allowCross={false} defaultValue={[0, 100]} onChange={this.handleOnChangePopularity}>
								</Range>
								<label>
									from {this.state.fromPop} to {this.state.toPop} points
								</label>
							</Col>
							<Col md={6}>
								<label>
									Distance
								</label>
								<select name="#" id="distance" className="form-control">
									<option value="10">
										10km
									</option>
									<option value="20">
										20km
									</option>
									<option value="50">
										50km
									</option>
									<option value="100">
										100km
									</option>
								</select>
							</Col>
							<Col md={6}>
								<label>
									#tags:
								</label>
								<input type="text" name="tag" id="tag" className="form-control">
								</input>
							</Col>
						</Row>
						<Row className="form-group">
							<Col md={12}>
								<label>
								</label>
								<Button className="btn-block" bsStyle="primary" bsSize="large" type="button" onClick={this.handleSearch}>
									Search
								</Button>
							</Col>
						</Row>
					</form>
				</div>
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
