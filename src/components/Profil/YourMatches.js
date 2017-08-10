import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Grid, Row, Col , Nav, NavItem, NavDropdown, MenuItem, InputGroup, FormGroup, Addon, FormControl, ProgressBar, bsStyle} from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function handleRequestDelete() {
  alert('You clicked the delete button.');
}

function handleTouchTap() {
  alert('You clicked the Chip.');
}



class YourMatches extends React.Component {
  constructor() {
    super();
    this.state = {name: "Pedro state"}
  }

  render() {
    return (
		<div>
	      <Badge
	        badgeContent={10}
	        secondary={true}
	        badgeStyle={{top: 12, right: 12}}
	      >
	        <IconButton tooltip="Notifications">
	          <NotificationsIcon />
	        </IconButton>
	      </Badge>


		  <div style={styles.wrapper}>

        <Chip
          style={styles.chip}
        >
          Text Chip
        </Chip>

        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          Deletable Text Chip
        </Chip>

        <Chip
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />
          Image Avatar Chip
        </Chip>

        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar src="https://cdn.intra.42.fr/users/medium_default.png" />
          Deletable Avatar Chip
        </Chip>


        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          SvgIcon Avatar Chip
        </Chip>

        <Chip onTouchTap={handleTouchTap} style={styles.chip}>
          <Avatar size={32}>A</Avatar>
          Text Avatar Chip
        </Chip>

        <Chip
          backgroundColor={blue300}
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar size={32} color={blue300} backgroundColor={indigo900}>
            MB
          </Avatar>
          Colored Chip
        </Chip>
      </div>
	    </div>


    );
  }
}

export default YourMatches;
