import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Header from "./Header";
import Footer from "./Footer";


class Welcome extends React.Component {

  render() {

    return (
        <div id='hello'>
				<Header />
			<h1>Matcha Maricón </h1>
			<Button>Default</Button>
				<Footer />

		</div>
    );
  }
}

export default Welcome;
