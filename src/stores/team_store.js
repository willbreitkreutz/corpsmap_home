import Reflux from 'reflux';
import app from 'ampersand-app';
import xhr from 'xhr';
import config from '../config';

const TeamStore = Reflux.createStore({
  init(){
    this.listenTo(app.actions.loadTeam, this.loadTeam);
    this.activeTeam = {}
  },
  loadTeam(id){
    const _this = this;
    xhr({
      url:config.centralRoot + 'team/' + id
    }, function(err, res, body){
      const team = JSON.parse(body);
      _this.activeTeam = team;
      _this.trigger();
    })
  },
  getTeam(){
    return this.activeTeam;
  }
})

module.exports = TeamStore;
