import React from "react"
import logo from './logo.png' // relative path to image


export default class Logo extends React.Component {
  render() {
    return (
      <img src={logo} alt={"logo"}/>
    );
  }
}
