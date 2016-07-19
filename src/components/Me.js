import React from 'react';
import NavbarBackground from './NavbarBackground';
import _ from 'lodash';

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
  goToMyData(){
    app.history.push('/' + this.state.user.edipi + '/data');
  },
  goToMyMaps(){
    app.history.push('/' + this.state.user.edipi + '/maps');
  },
  render(){
    return (
      <div>
        <NavbarBackground />
        <div className="container">
          <div className="panel panel-default page-top-panel">
            <div className="panel-heading">
              <span>Logged in as {this.state.user.certName}</span>
              <span className="pull-right">Created account {this.state.user.prettyDateCreated}</span>
            </div>
            <div className="panel-body">
              <h2>{this.state.user.edipi}</h2>
              <p>Last Validated {this.state.user.prettyIat}</p>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>My Teams</h4>
            </div>
            <div className="panel-body">
              Share your data with your team, and see datasets shared by other team members.
            </div>
            <ul className="list-group">
              <li className="list-group-item no-data-list-item">No Teams yet</li>
            </ul>
            <div className="panel-footer clearfix">
              <button type="button" className="btn btn-sm btn-default pull-right">Request New Team</button>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>My Data</h4>
            </div>
            <ul className="list-group">
              <li className="list-group-item no-data-list-item">No Datasets yet</li>
            </ul>
            <div className="panel-footer clearfix">
              <button onClick={this.goToMyData} type="button" className="btn btn-sm btn-info pull-right">Go to My Data</button>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>My Maps</h4>
            </div>
            <ul className="list-group">
              <li className="list-group-item no-data-list-item">No Maps yet</li>
            </ul>
            <div className="panel-footer clearfix">
              <button onClick={this.goToMyMaps} type="button" className="btn btn-sm btn-info pull-right">Go to My Maps</button>
            </div>
          </div>

        </div>
      </div>
    )
  }
})

export default Me;
