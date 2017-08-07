import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


import Header from "../Header";
import Footer from "../Footer";
import Video from "../Video";
import Mapping from "../Mapping";
import MainMenu from "../MainMenu/MainMenu";
import GridImagesExample from "../MainMenu/GridImageExample";



class FindPeople extends React.Component {
  constructor() {
    super();
    this.state = {name: "Pedro state"}
  }

  render() {
    const title="test props dans le welcome";
    return (
      <div id='mybody'>
        <Header title={title}/>
        <Mapping />
        {/*<Footer />*/}

      </div>
    );
  }
}

export default FindPeople;
