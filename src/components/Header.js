import React from "react"
import Title from "./Header/Title";


export default class Header extends React.Component {
  render() {
    return (
        <header id="myHeader">
			<div>Header</div>
			<Title />
		</header>
    );
  }
}
