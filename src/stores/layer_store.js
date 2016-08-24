import Reflux from 'reflux';
import app from 'ampersand-app';
import io from 'socket.io-client';
import config from '../config';
import xhr from 'xhr';

const LayerStore = Reflux.createStore({
  init(){
    this.listenTo(app.actions.upload, this._upload);
    this.uploadStatus = {};
  },
  _upload(formData){
    var _this = this;
    var token = app.userStore.getToken();

    this.setUploadStatus({
      statusMsg: 'Uploading Dataset',
      pctComplete: 5
    })

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
        body = JSON.parse(body);
        if(body.id){

          _this.setUploadStatus({
            statusMsg: 'Inserting into Database',
            pctComplete: 25
          })

          var socket = io(config.httpsWsUrl);
          socket.on('upload-status', function(data){
            if(data.id === body.id){
              console.log(data.statusMsg);
              _this.setUploadStatus(data);
              if(data.statusMsg === 'Upload Complete'){
                window.setTimeout(function(){
                  _this.setUploadStatus({})
                }, 500)
                socket.close();
              }
            }
          })
        }else{
          console.log(body)
        }
      }
    })
  },
  setUploadStatus(status){
    this.uploadStatus = status;
    this.trigger(status.statusMsg);
  },
  getUploadStatus(){
    return this.uploadStatus;
  }
})

module.exports =  LayerStore;
