import React from 'react';
import NavbarBackground from './NavbarBackground';
import _ from 'lodash';
import classnames from 'classnames';
import TeamsList from './TeamsList';
import DatasetList from './DatasetList';
import MapList from './MapList';
import app from 'ampersand-app';

const Me = React.createClass({
  getInitialState(){
    return {
      user:{}
    }
  },
  componentWillMount(){
    var user = app.userStore.getUser();
    if(_.isEmpty(user)){
      app.history.push('/');
    }else{
      this.setState({user:user})
    }
  },
  render(){
    var teams = this.state.user.teams;
    return (
      <div>
        <NavbarBackground />
        <div className="container">
          <div className="panel panel-default page-top-panel">
            <div className="panel-heading">
              <span>Logged in as {this.state.user.username}</span>
              <span className="pull-right">Created account {this.state.user.prettyDateCreated}</span>
            </div>
            <div className="panel-body">
              <h2>{this.state.user.username}</h2>
              <h4>{this.state.user.email}</h4>
              <p>Last Validated {this.state.user.prettyIat}</p>
            </div>
            <div className="hidden panel-footer clearfix">
              <button type="button" className="btn btn-sm btn-info pull-right">Edit Profile</button>
            </div>
          </div>

          <TeamsList teams={teams} />

          <DatasetList user={this.state.user} />

          <MapList user = {this.state.user} />

        </div>
      </div>
    )
  }
})

export default Me;
