import React from 'react';

const DatasetToolbar = React.createClass({
  render(){
    return (
      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-primary"><i className="glyphicon glyphicon-cloud-upload glyphicon-inline"></i>Upload New Version</button>
          <button type="button" className="btn btn-primary"><i className="glyphicon glyphicon-cloud-download glyphicon-inline"></i>Download Copy</button>
          <button type="button" className="btn btn-primary"><i className="glyphicon glyphicon-share-alt glyphicon-inline"></i>Share</button>
          <button type="button" className="btn btn-success"><i className="glyphicon glyphicon-globe glyphicon-inline"></i>New Map using this Dataset</button>
        </div>
        <div className="btn-group pull-right" role="group">
          <button type="button" className="btn btn-danger"><i className="glyphicon glyphicon-remove-circle glyphicon-inline"></i>Delete</button>
        </div>
      </div>
    )
  }
})

export default DatasetToolbar;
