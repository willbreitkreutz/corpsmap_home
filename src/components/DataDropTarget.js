import React from 'react';
import style from '../styles/DataDropTarget.styl';
import _ from 'lodash';

const DataDropTarget = React.createClass({
  displayName:'DataDropTarget',
  getInitialState(){
    return {
      files:[]
    }
  },
  componentDidMount(){
    window.addEventListener('drop',function(e){
      e.preventDefault();
    }, false);
    window.addEventListener('dragover',function(e){
      e.preventDefault();
    }, false);
  },
  componentWillUnmount(){
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
  upload(){
    alert('going to upload via ajax, just not implemented yet')
  },
  render(){
    var Comp
    if(_.isEmpty(this.state.files)){
      Comp =  (
        <div>
          <input type="file" id="fileElem" multiple accept="*" className="hidden" onChange={this.handleFile}></input>
          <div className="drop-target-title">Drag and Drop Here! or</div>
          <button className="btn btn-xs btn-success" onClick={this.browse}>Click to Browse</button>
        </div>
      )
    }else{
      Comp =  (
        <div>
          <div className="file-name">{this.state.files[0].name}</div>
          <button className="btn btn-xs btn-success" onClick={this.upload}>Upload</button>
          <button className="btn btn-xs btn-danger" onClick={this.clearFiles}>Clear</button>
        </div>
      )
    }

    return (
      <div id="upload-drop-target" onDragEnter={this.dragEnter} onDragLeave={this.dragLeave} onDrop={this.handleFile} className="drop-target">
        {Comp}
      </div>
    )
  }
})

export default DataDropTarget;
