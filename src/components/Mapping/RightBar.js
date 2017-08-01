import React from "react"
import Research from "./Research"
import { Button, Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class RightBar extends React.Component {
	renderPhoto(object, key) {
		return (
				<Col md={4} key={key} className="center">
					<div>{object.pseudo}, {object.age}</div>
				<img className="photoThumbnail" src={object.photo} key={Object.keys(object)}/>
				</Col>
		)
	}
	renderPhotos(array) {
		var grid = [];
		for (var i = 0; i < array.length; i++) {
			grid.push(this.renderPhoto(array[i], i));
		}
		return grid;
	}
  render() {

	  const myJson = {
		  "data":[
			  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "Lat":"48.856614", "Lng":"21.352222", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg"},
			  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg"},
			  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_eozdek.jpg"},
			  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"female", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg"},
			  {"pseudo":"sergie", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_svelhinh.jpg"},
			  {"pseudo":"pontoise", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_grass-kw.jpg"},
			  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"female", "like":"male", "Lat":"48.856614", "Lng":"21.352222", "photo":"https://cdn.intra.42.fr/users/medium_eozdek.jpg"},
			  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg"},
			  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg"},
			  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg"},
			  {"pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "Lat":"48.856614", "Lng":"21.352222", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg"},
			  {"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"female", "like":"male", "Lat":"45.856614" , "Lng":"12.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg"},
			  {"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "Lat":"38.856614", "Lng":"7.352222", "photo":"https://cdn.intra.42.fr/users/medium_oseng.jpg"},
			  {"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"female", "like":"female", "Lat":"48.956614" , "Lng":"2.352222", "photo":"https://cdn.intra.42.fr/users/medium_pguzman.jpg"},
			  {"pseudo":"Peter", "email":"Jones@test.com", "age":"58","sexe":"male", "like":"male", "Lat":"48.756614" , "Lng":"2.952222", "photo":"https://cdn.intra.42.fr/users/medium_stoussay.jpg"}
		  ]
	  };
	  console.log(myJson);
	  console.log(myJson.data[0].pseudo);
    return (


  <div className="rightBarMap">

  <div >

	  <Research />

	  <Row>
	  	<Col md={12} className="resultPhotos">
		 	{this.renderPhotos(myJson.data)}
      	</Col>
	  </Row>

    </div>






  </div>


    );
  }
}
