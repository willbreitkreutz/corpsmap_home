import React from 'react';
import style from '../styles/Toaster.styl';

const Toaster = React.createClass({

  getInitialState(){
    var t = this.props.transitionTime || 1000;
    var bc = '#7d0e94';
    return {
      _t: t,
      style: {
        opacity: 0,
        backgroundColor: bc
      },
      status: this.getStateFromStores()
    }
  },

  fadeIn(){
    var _this = this;
    var opacity = this.state.style.opacity;
    var bc = this.state.style.backgroundColor;
    var start = new Date();
    var tick = function(){
      opacity = opacity + ((new Date() - start) / _this.state._t);
      _this.setState({style:{opacity:opacity, backgroundColor: bc}});
      if(opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    }
    tick();
    window.setTimeout(function(){
      _this.fadeOut();
    }, 5000)
  },

  fadeOut(){
    var _this = this;
    var opacity = +this.state.style.opacity;
    var bc = this.state.style.backgroundColor;
    var start = +new Date();
    var tick = function(){
      opacity = +opacity - ((new Date() - start) / _this.state._t);
      _this.setState({style:{opacity:opacity, backgroundColor: bc}});
      if(opacity > 0) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    }
    tick();
  },

  componentDidMount(){
    const _this = this;
    this._unlistener = app.layerStore.listen(function(){
      _this.setState({status: _this.getStateFromStores()});
    })
  },

  componentWillUnmount(){
    this._unlistener();
  },

  getStateFromStores(){
    var status = app.layerStore.getUploadStatus();
    if(status.statusMsg){
      this.fadeIn();
    }
    return status;
  },

  render(){
    var statusMsg = '';
    if(this.state.status.statusMsg) statusMsg = this.state.status.statusMsg;
    return (
      <div onClick={this.fadeOut} style={this.state.style} className="toaster" >{statusMsg}</div>
    )
  }
})

export default Toaster;
