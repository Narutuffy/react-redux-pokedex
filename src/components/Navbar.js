import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <nav className="navbar navbar-light" style={{ backgroundColor: 'rgb(239, 83, 80)' }} >
        <span className="navbar-brand" style={{color: '#fff'}}>Pokédex</span>
      </nav>
    );
  }
}

export default Navbar;
