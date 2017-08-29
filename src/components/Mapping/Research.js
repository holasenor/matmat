// import 'rc-slider/assets/index.css';
import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Slider from 'rc-slider';
const Range = Slider.Range;

const style = { width: 100, margin: 5 };



export default class Research extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.fromAge = 0;
		this.state.toAge = 100;
		this.handleOnChangeAge = this.handleOnChangeAge.bind(this);
		this.handleOnChangePopularity = this.handleOnChangePopularity.bind(this);
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

	render() {
		return (
			<div>
				<div >
					<form action="#">
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
								<select name="#" id="like" className="form-control">
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
								<Button className="btn-block" bsStyle="primary" bsSize="large" active type="submit" value="Submit">
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
