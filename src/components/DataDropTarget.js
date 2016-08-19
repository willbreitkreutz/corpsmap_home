import React from 'react';
import style from '../styles/DataDropTarget.styl';
import _ from 'lodash';
import UploadForm from './UploadForm';

// const UploadForm = React.createClass({
//   render(){
//     return (
//       <form>
//         <div className="form-group">
//           <label htmlFor="datasetName">Dataset Name</label>
//           <input type="text" className="form-control" id="datasetName"></input>
//         </div>
//
//         <div className="form-group">
//           <label htmlFor="datasetDescription">Description</label>
//           <textarea type="text" rows="3" className="form-control" id="datasetDescription"></textarea>
//         </div>
//
//         <button type="submit" className="btn btn-default">Submit</button>
//       </form>
//     )
//   }
// })

const DataDropTarget = React.createClass({
  displayName:'DataDropTarget',
  getInitialState(){
    return {
      files:[],
      uploading:false
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
    //var url = '/' + this.props.user.edipi + '/data/upload';
    //app.history.push(url)
    this.setState({uploading:true})
    // var _this = this;
    // var i = 0;
    // function func(){
    //   _this.setState({progress:i++});
    //   if(i < 101) timer = setTimeout(func, 100)
    // }
    // var timer = setTimeout(func, 100)
  },
  render(){
    var Comp
    var statusStyle = {
      background: 'linear-gradient(to right, #f2f2f2 0%, #f2f2f2 '+ this.state.progress +'%, #FFF '+ (this.state.progress+2) +'%, #FFF 100%)'
    }
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
            <div id="upload-drop-target" style={statusStyle} onDragEnter={this.dragEnter} onDragLeave={this.dragLeave} onDrop={this.handleFile} className="drop-target">
              <div className="file-name">{this.state.files[0].name}</div>
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
