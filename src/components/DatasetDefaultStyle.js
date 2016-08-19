import React from 'react';
import ColorPicker from './ColorPicker';
import rgbToHex from '../lib/rgbToHex';

const DatasetDefaultStyle = React.createClass({
  getInitialState(){
    return JSON.parse(this.props.dataset.def)
  },
  fillChange(color){
    console.log('fill', color)
  },
  outlineChange(color){
    console.log(this.state)
    console.log('outline', color)
  },
  render(){
    const _this = this;
    const classes = this.state.classes;
    return (
      <div>
        {
          classes.map(function(cls){
            let color;
            if(cls.style.color.indexOf('#') === -1){
              let colorArr = cls.style.color.split(' ');
              color = rgbToHex('rgb(' + colorArr[0] + ',' + colorArr[1] + ',' + colorArr[2] + ')')
            }else{
              color = cls.style.color;
            }

            let outlineColor;
            if(cls.style.outlinecolor.indexOf('#') === -1){
              let outlineColorArr = cls.style.outlinecolor.split(' ');
              outlineColor = rgbToHex('rgb(' + outlineColorArr[0] + ',' + outlineColorArr[1] + ',' + outlineColorArr[2] + ')')
            }else{
              outlineColor = cls.style.outlinecolor;
            }

            return (
              <div key={cls.className}>
                <div className="clearfix">
                  <div className="setting-label">Fill</div>
                  <div className="pull-right">
                    <ColorPicker color={color} changeHandler={_this.fillChange} />
                  </div>
                </div>
                <div className="clearfix">
                  <div className="setting-label">Outline</div>
                  <div className="pull-right">
                  Width
                    <input type="number" className="form-control input-sm"></input>
                    <ColorPicker color={outlineColor} changeHandler={_this.outlineChange} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
})

export default DatasetDefaultStyle;
