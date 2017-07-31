import React, { Component } from 'react';
import axios from 'axios';

class Welcome extends Component {

    asdf() {
        axios.get("/user")
        .then((data) => {
            console.log(data);
        })
    }

    render() {
        return (
            <div id='hello'>hello world</div>
        );
    }
}

export default Welcome;
