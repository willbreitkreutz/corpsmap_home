import Reflux from 'reflux';
import app from 'ampersand-app';
import corpsmapAuth from '../lib/corpsmap-auth-client';
import moment from 'moment';
import xhr from 'xhr';
import _ from 'lodash';
import config from '../config';

const UserStore = Reflux.createStore({
  init(){
    this.listenTo(app.actions.login, this._login);
    this.listenTo(app.actions.logout, this._logout);
    this.listenTo(app.actions.refresh, this._refresh);
    this.user = window.localStorage.user ? JSON.parse(window.localStorage.user) : {};
    if(this._isLoggedIn()) this._refresh();
  },

  _login(){
    const _this = this;
    corpsmapAuth.login(function(err, payload){
      if(err) return alert(err);
      _this._refresh();
    })
  },

  _logout(){
    corpsmapAuth.logout();
    this.user = {};
    this.trigger();
  },

  _getProfile(edipi, callback){
    xhr({
      url:config.centralRoot + 'profile/' + edipi
    }, function(err, res, body){
      var profile = JSON.parse(body);
      callback(profile);
    })
  },

  _refresh(){
    if(this._isLoggedIn()){
      var _this = this;
      var payload = corpsmapAuth.getTokenPayload();
      var prettyDate = moment(payload.user[2], 'YYYY-MM-DDTHH:mm:SZ');
      var prettyIat = moment(payload.iat * 1000);
      this._getProfile(payload.user[0], function(profile){
        var user = {
          edipi: payload.user[0],
          certName: payload.user[1],
          dateCreated: payload.user[2],
          prettyDateCreated: prettyDate.fromNow(),
          iat: payload.iat,
          prettyIat: prettyIat.fromNow(),
          username: profile.user.username,
          email: profile.user.email,
          teams: profile.teams,
          datasets: profile.datasets
        }
        _this.user = user;
        window.localStorage.user = JSON.stringify(user);
        _this.trigger();
      })
    }
  },

  _isLoggedIn(){
    return corpsmapAuth.isLoggedIn();
  },

  getUser(){
    return this.user;
  },

  getToken(){
    if(this._isLoggedIn()){
      return corpsmapAuth.getTokenString();
    }else{
      return undefined;
    }
  },
  // Starting to add filtering to list od datasets, might move to ampersand collection for this functionality re. photo classifier
  // filterDatasets(filter){
  //   this.filtered
  // },
  //
  // getFilteredDatasets(){
  //
  // },

  getDatasets(matchObj){
    var datasets = [];
    if(this.user.datasets){
      this.user.datasets.forEach(function(ds){
        if(_.isMatch(ds, matchObj)) datasets.push(ds);
      })
    }
    return datasets;
  }
})

module.exports =  UserStore;
