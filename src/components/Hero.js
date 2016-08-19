import React from 'react';
import style from '../styles/Hero.styl';

const Hero = React.createClass({
  render(){
    return (
      <div className="jumbotron hero">
        <div className="container">
          <div className="hero-heading">CorpsMap 3.0</div>
          <div className="hero-subtitle">The open web mapping platform for USACE</div>
        </div>
      </div>
    )
  }
})

export default Hero;
