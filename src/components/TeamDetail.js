import React from 'react';
import NavbarBackground from './NavbarBackground';
import _ from 'lodash';
import classnames from 'classnames';
import app from 'ampersand-app';

const TeamDetail = React.createClass({
  getInitialState(){
    return {
      team:{}
    }
  },
  componentWillMount(){
    const _this = this;
    this._actionUnlistener = app.teamStore.listen(function(){
      _this.getStateFromStores();
    })
  },
  componentWillUnmount(){
    this._actionUnlistener();
  },
  getStateFromStores(){
    this.setState(app.teamStore.getTeam());
  },
  render(){
    return (
      <div>
        <NavbarBackground />
        <div className="container">
          <div className="panel panel-default page-top-panel">
            <div className="panel-body">
              <h3>{this.state.team.title}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Team Activity</h4>
                </div>
                <div className="panel-body">
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Datasets</h4>
                </div>
                <div className="panel-body">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default TeamDetail;
