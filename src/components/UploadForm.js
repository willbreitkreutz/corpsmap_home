import React from 'react';
import NavbarBackground from './NavbarBackground';
import style from '../styles/UploadForm.styl';

const UploadForm = React.createClass({
  render(){
    return (
      <div>
        <NavbarBackground />
        <div className="container">
          <div className="panel panel-default page-top-panel">
            <div className="panel-body">
              <form>

                <div className="form-group">
                  <label htmlFor="datasetName">Dataset Name</label>
                  <input type="text" className="form-control" id="datasetName"></input>
                </div>

                <div className="form-group">
                  <label htmlFor="datasetDescription">Description</label>
                  <textarea type="text" rows="3" className="form-control" id="datasetDescription"></textarea>
                </div>

                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default UploadForm;
