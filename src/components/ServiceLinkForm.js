import React from 'react';
import style from '../styles/ServiceLinkForm.styl';

const ServiceLinkForm = React.createClass({
  displayName:'ServiceLinkForm',
  render(){
    return (
      <div>
        <p>We support MapServer and ArcGIS Server services</p>
        <div className="input-group service-link-form">
          <input type="text" className="form-control" placeholder="Service URL..."></input>
          <span className="input-group-btn">
            <button className="btn btn-success" type="button">Go!</button>
          </span>
        </div>
      </div>
    )
  }
})

export default ServiceLinkForm;
