import React from 'react';
//import { Link } from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import BellIcon from 'react-bell-icon';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <Nav>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Sign in</Nav.Link>
        <Nav.Link href="/register">Sing up</Nav.Link>
      </Nav>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <Nav>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/">Listen</Nav.Link>
        <Nav.Link href="/">Idiom</Nav.Link>
        <Nav.Link href="/">Article</Nav.Link>
        
        <Nav.Link href="#"><img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} /></Nav.Link>
        <NavDropdown title={props.currentUser.username} id="collasible-nav-dropdown">
          <NavDropdown.Item href={`/@${props.currentUser.username}`}>view profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Sign out</NavDropdown.Item>
        </NavDropdown>
        {/* <Nav.Link href="#"><BellIcon width='20' active={true} animate={true} color='#fff'/></Nav.Link> */}
        {/* <Nav.Link href={`/@${props.currentUser.username}`}><img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} /> */}
      </Nav>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">{this.props.appName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
