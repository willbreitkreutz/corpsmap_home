import React from 'react';
import { SketchPicker } from 'react-color';
import classnames from 'classnames';
import style from '../styles/ColorPicker.styl';

const ColorPicker = React.createClass({
  getInitialState(){
    return {
      backgroundColor: this.props.color || '#C3C3c3',
      open: false
    }
  },
  colorChange(color){
    this.setState({
      backgroundColor: color.hex
    });
    if(this.props.changeHandler){
      this.props.changeHandler(color);
    }
  },
  togglePicker(){
    this.setState({ open: !this.state.open });
  },
  handleClose(){
    this.setState({ open: false });
  },
  render(){
    const colorOpen = classnames({
      'color-popover': true,
      'hidden': !this.state.open
    })
    const fillIcon = classnames({
      'glyphicon': true,
      'glyphicon-chevron-down': !this.state.open,
      'glyphicon-chevron-up': this.state.open,
      'glyphicon-inline': true
    })
    return (
      <div className="swatch-container">
        <div className="swatch" style={this.state} onClick={this.togglePicker} />
        <div className={colorOpen}>
          <div className="cover" onClick={this.handleClose} />
          <div className="wrapper">
            <SketchPicker color={this.state.backgroundColor} onChangeComplete={this.colorChange} />
          </div>
        </div>
      </div>
    )
  }
})

export default ColorPicker;
