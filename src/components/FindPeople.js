import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Header from "./Header";
import Footer from "./Footer";
import Video from "./Video";
import Mapping from "./Mapping";


class FindPeople extends React.Component {
  constructor() {
    super();
    this.state = {name: "Pedro state"};
  }

  render() {
    const title="test props mapping";
    return (
      <div id='mybody'>
        <Header title={title}/>
        <Mapping />

      </div>
    );
  }
}

export default FindPeople;
