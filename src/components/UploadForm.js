import React from 'react';
import NavbarBackground from './NavbarBackground';
import style from '../styles/UploadForm.styl';
import app from 'ampersand-app';
import xhr from 'xhr';
import config from '../config';

const UploadForm = React.createClass({
  getInitialState(){
    return {
      dataset_name:'',
      dataset_desc:''
    }
  },
  submit(e){
    e.preventDefault();
    var _this = this;
    var files = this.props.files;
    var token = app.userStore.getToken();
    var formData = new FormData();
    formData.append('dataset_name', this.state.dataset_name);
    formData.append('dataset_desc', this.state.dataset_desc);
    formData.append('input_file', files[0]);

    xhr.post({
      url: config.httpsUploadUrl,
      headers:{
        "Authorization": 'Bearer ' + token
      },
      body: formData
    }, function(err, response, body){
      if(err){
        console.log('error submitting:', err);
      }else{
        app.actions.refreshProfile();
      }
    })
  },
  changeName(e){
    this.setState({dataset_name: e.target.value})
  },
  changeDesc(e){
    this.setState({dataset_desc: e.target.value})
  },
  render(){
    return (
      <form>
        <input type="file" id="fileElem" multiple accept="*" className="hidden" ></input>

        <div className="form-group">
          <label htmlFor="datasetName">Dataset Name</label>
          <input value={this.state.dataset_name} onChange={this.changeName} type="text" className="form-control" id="dataset_name"></input>
        </div>

        <div className="form-group">
          <label htmlFor="datasetDescription">Description</label>
          <textarea value={this.state.dataset_desc} onChange={this.changeDesc} type="text" rows="3" className="form-control" id="dataset_desc"></textarea>
        </div>

        <button onClick={this.submit} className="btn btn-default">Submit</button>
      </form>
    )
  }
})

export default UploadForm;
