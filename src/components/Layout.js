import React from "react"


export default class Layout extends Component {
	constructor() {
		super();
		this.name = "lopette";
	}


  render() {
    return (
        <div id='hello'>
			<h1>Matcha {this.name} Maricón </h1>
			<Button>Default</Button>
		</div>
    );
  }
}

export default Layout;
