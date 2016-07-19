import React from 'react';
import NavbarBackground from './NavbarBackground';

const MyMaps = React.createClass({
  render(){
    return (
      <div>
        <NavbarBackground />
        <div className="container">
          <div className="no-data-title">No Saved Maps Yet!</div>
        </div>
      </div>
    )
  }
})

export default MyMaps;
