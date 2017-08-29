import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Slider from 'rc-slider';
import {getSearchResults} from '../../helpers/mainHelper.js';
const Range = Slider.Range;
var $ = require("jquery");

export default class Research extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.myInfo = this.props.myInfo;
		this.state.fromAge = 0;
		this.state.toAge = 100;
		this.state.fromPop = 0;
		this.state.toPop = 100;
		this.handleOnChangeAge = this.handleOnChangeAge.bind(this);
		this.handleOnChangePopularity = this.handleOnChangePopularity.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
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
		var	popularityInterval = [this.state.fromPop, this.state.toPop];
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
		var myInfo = this.state.myInfo;
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

	render() {
		return (
			<div>
				<div >
					<form id="searchForm" action="#">
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
			</div>
		);
	}
}
