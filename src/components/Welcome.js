import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Header from "./Header";
import Mapping from "./Mapping";
import MainMenu from "./MainMenu/MainMenu";
import GridImagesExample from "./MainMenu/GridImageExample";



class Welcome extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='mybody'>
        <MainMenu />
        <GridImagesExample />
      </div>
    );
  }
}

export default Welcome;
