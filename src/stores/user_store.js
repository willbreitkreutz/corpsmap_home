import Reflux from 'reflux';
import app from 'ampersand-app';
import corpsmapAuth from '../lib/corpsmap-auth-client';
import moment from 'moment';

const UserStore = Reflux.createStore({
  init(){
    this.listenTo(app.actions.login, this._login);
    this.listenTo(app.actions.logout, this._logout);
    if(corpsmapAuth.isLoggedIn()){
      this.setUser(corpsmapAuth.getTokenPayload());
    }
  },
  isLoggedIn(){
    return corpsmapAuth.isLoggedIn();
  },
  getUser(){
    return this.user;
  },
  setUser(payload){
    var prettyDate = moment(payload.user[2], 'YYYY-MM-DDTHH:mm:SZ')
    var prettyIat = moment(payload.iat * 1000);
    this.user = {
      edipi: payload.user[0],
      certName: payload.user[1],
      dateCreated: payload.user[2],
      prettyDateCreated: prettyDate.fromNow(),
      iat: payload.iat,
      prettyIat: prettyIat.fromNow()
    }
    this.trigger()
  },
  _login(){
    const _this = this;
    corpsmapAuth.login(function(err, payload){
      if(err) return alert(err);
      _this.setUser(payload);
    })
  },
  _logout(){
    corpsmapAuth.logout();
    this.user = {};
    this.trigger();
  }
})

module.exports =  UserStore;
