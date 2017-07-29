import React from "react"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class GridImagesExample extends React.Component {
  render() {
    return (


      <div className="gtco-section">
    		<div className="gtco-container">
    			<Grid >
            <Col md={2}>
            </Col>
    				<Col md={8} className="text-center gtco-heading">
    					<h2>Most Interesting People</h2>
    					<p>Voilà du beau monde : beaux, intelligents, sportifs, généreux, drôles, empathiques</p>
    				</Col>


                			<Row >
                				<Col lg={4} md={4} sm={6}>
                					<a href="images/img_1.jpg" className="fh5co-card-item image-popup">
                						<figure>
                							<div className="overlay"><i className="ti-plus"></i></div>
                							<img src="https://cdn.intra.42.fr/users/medium_oseng.jpg" alt="Image" className="img-responsive"/>
                						</figure>
                						<div className="fh5co-text">
                							<h2>New York, USA</h2>
                							<p>Far far away, behind the word mountains, far from the countries Vokalia..</p>
                							<p><span className="btn btn-primary">Schedule a Trip</span></p>
                						</div>
                					</a>
                        </Col>
                				<Col lg={4} md={4} sm={6}>
                					<a href="images/img_2.jpg" className="fh5co-card-item image-popup">
                						<figure>
                							<div className="overlay"><i className="ti-plus"></i></div>
                							<img src="https://cdn.intra.42.fr/users/medium_eozdek.jpg" alt="Image" className="img-responsive"/>
                						</figure>
                						<div className="fh5co-text">
                							<h2>Seoul, South Korea</h2>
                							<p>Far far away, behind the word mountains, far from the countries Vokalia..</p>
                							<p><span className="btn btn-primary">Schedule a Trip</span></p>
                						</div>
                					</a>
                        </Col>
                				<Col lg={4} md={4} sm={6}>
                					<a href="images/img_3.jpg" className="fh5co-card-item image-popup">
                						<figure>
                							<div className="overlay"><i className="ti-plus"></i></div>
                							<img src="https://cdn.intra.42.fr/users/medium_pguzman.jpg" alt="Image" className="img-responsive"/>
                						</figure>
                						<div className="fh5co-text">
                							<h2>Paris, France</h2>
                							<p>Far far away, behind the word mountains, far from the countries Vokalia..</p>
                							<p><span className="btn btn-primary">Schedule a Trip</span></p>
                						</div>
                					</a>
                        </Col>


                				<Col lg={4} md={4} sm={6}>
                					<a href="images/img_4.jpg" className="fh5co-card-item image-popup">
                						<figure>
                							<div className="overlay"><i className="ti-plus"></i></div>
                							<img src="https://cdn.intra.42.fr/users/medium_grass-kw.jpg" alt="Image" className="img-responsive"/>
                						</figure>
                						<div className="fh5co-text">
                							<h2>Sydney, Australia</h2>
                							<p>Far far away, behind the word mountains, far from the countries Vokalia..</p>
                							<p><span className="btn btn-primary">Schedule a Trip</span></p>
                						</div>
                					</a>
                        </Col>

                				<Col lg={4} md={4} sm={6}>
                					<a href="images/img_5.jpg" className="fh5co-card-item image-popup">
                						<figure>
                							<div className="overlay"><i className="ti-plus"></i></div>
                							<img src="https://cdn.intra.42.fr/users/medium_stoussay.jpg" alt="Image" className="img-responsive"/>
                						</figure>
                						<div className="fh5co-text">
                							<h2>Greece, Europe</h2>
                							<p>Far far away, behind the word mountains, far from the countries Vokalia..</p>
                							<p><span className="btn btn-primary">Schedule a Trip</span></p>
                						</div>
                					</a>
                        </Col>

                				<Col lg={4} md={4} sm={6}>
                					<a href="images/img_6.jpg" className="fh5co-card-item image-popup">
                						<figure>
                							<div className="overlay"><i className="ti-plus"></i></div>
                							<img src="https://cdn.intra.42.fr/users/medium_svelhinh.jpg" alt="Image" className="img-responsive"/>
                						</figure>
                						<div className="fh5co-text">
                							<h2>Spain, Europe</h2>
                							<p>Far far away, behind the word mountains, far from the countries Vokalia..</p>
                							<p><span className="btn btn-primary">Schedule a Trip</span></p>
                						</div>
                					</a>
                        </Col>

                      </Row>

    			</Grid>
    		</div>
    	</div>







    );
  }
}
