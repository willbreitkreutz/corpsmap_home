import React from 'react';
import style from '../styles/DataDropTarget.styl';
import _ from 'lodash';
import classnames from 'classnames';
import UploadForm from './UploadForm';
import app from 'ampersand-app';
import Spinner from 'react-spinkit';

const DataDropTarget = React.createClass({
  displayName:'DataDropTarget',

  getInitialState(){
    return {
      files:[],
      uploading:false
    }
  },
  componentDidMount(){
    const _this = this;
    this._unlistener = app.layerStore.listen(function(){
      _this.setState(_this.getStateFromStores());
    })
    window.addEventListener('drop',function(e){
      e.preventDefault();
    }, false);
    window.addEventListener('dragover',function(e){
      e.preventDefault();
    }, false);
  },
  componentWillUnmount(){
    this._unlistener();
    window.removeEventListener('drop',function(e){
      e.preventDefault();
    }, false);
    window.removeEventListener('dragover',function(e){
      e.preventDefault();
    }, false);
  },
  dragEnter(e){
    e.target.classList.add('drag-over');
  },
  dragLeave(e){
    e.target.classList.remove('drag-over');
  },
  browse(e){
    document.getElementById('fileElem').click();
  },
  handleFile(e){
    e.stopPropagation();
    e.preventDefault();
    var files;
    if(e.dataTransfer){
      e.target.classList.remove('drag-over');
      files = e.dataTransfer.files;
    }else{
      files = e.target.files
    }
    this.setState({
      files:files
    })
  },
  clearFiles(){
    this.setState({
      files:[]
    })
  },
  getStateFromStores(){
    var status = app.layerStore.getUploadStatus();
    return {
      progress: status.pctComplete,
      statusMsg: status.statusMsg
    }
  },
  upload(){
    this.setState({uploading:true})
  },
  render(){
    var Comp
    // var statusStyle = {
    //   background: 'linear-gradient(to right, #f2f2f2 0%, #f2f2f2 '+ this.state.progress +'%, #FFF '+ (this.state.progress+2) +'%, #FFF 100%)'
    // }
    var uploadClass = classnames({
      "upload-spinner-container": true,
      "hidden": this.state.statusMsg !== 'Uploading Dataset'
    })
    //var statusMsg = ;
    if(_.isEmpty(this.state.files)){
      Comp =  (
        <div id="upload-drop-target" onDragEnter={this.dragEnter} onDragLeave={this.dragLeave} onDrop={this.handleFile} className="drop-target">
          <input type="file" id="fileElem" multiple accept="*" className="hidden" onChange={this.handleFile}></input>
          <div className="drop-target-title">Drag and Drop Here! or</div>
          <button className="btn btn-xs btn-success" onClick={this.browse}>Click to Browse</button>
        </div>
      )
    }else{
      if(this.state.uploading){
        Comp = (
          <div>
            <div id="upload-drop-target" onDragEnter={this.dragEnter} onDragLeave={this.dragLeave} onDrop={this.handleFile} className="drop-target">
              <div className={uploadClass}><Spinner spinnerName="three-bounce" className="upload-spinner" /></div>
              <div className="file-name">{this.state.statusMsg || this.state.files[0].name}</div>
            </div>
            <UploadForm user={this.props.user} files={this.state.files}/>
          </div>
        )
      }else{
        Comp =  (
          <div id="upload-drop-target" onDragEnter={this.dragEnter} onDragLeave={this.dragLeave} onDrop={this.handleFile} className="drop-target">
            <div className="file-name">{this.state.files[0].name}</div>
            <button className="btn btn-xs btn-success" onClick={this.upload}>Confirm</button>
            <button className="btn btn-xs btn-danger" onClick={this.clearFiles}>Clear</button>
          </div>
        )
      }
    }

    return (
      <div>
        {Comp}
      </div>
    )
  }
})

export default DataDropTarget;


//<div className="file-name">{this.state.statusMsg || this.state.files[0].name}</div>
//<Spinner spinnerName="three-bounce" />
