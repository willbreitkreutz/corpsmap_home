import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Reflux from 'reflux';
import app from 'ampersand-app';

import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import paper from '../node_modules/bootstrap/dist/css/paper-theme.css';
import style from './styles/index.styl';
// import components
import PageContainer from './components/PageContainer';
import Home from './components/Home';
import Me from './components/Me';
import MyData from './components/MyData';
import MyMaps from './components/MyMaps';
import TeamDetail from './components/TeamDetail';
import UploadForm from './components/UploadForm';
import DatasetDetail from './components/DatasetDetail';

const Project = React.createClass({
  render(){
    return <div>project: {this.props.params.projectName}</div>
  }
})

const CorpsMapHome = (
  <Router history={browserHistory}>
    <Route path="/" component={PageContainer}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="/project/:projectName" component={Project}></Route>
      <Route path="/:edipi/me" component={Me}></Route>
      <Route path="/:edipi/data" component={MyData}></Route>
      <Route path="/:edipi/data/:id" component={DatasetDetail}></Route>
      <Route path="/:edipi/maps" component={MyMaps}></Route>
      <Route path="/team/:id" component={TeamDetail}></Route>
    </Route>
  </Router>
)

const actions = Reflux.createActions([
  'login',
  'logout',
  'loadTeam',
  'refresh',
  'upload'
])

app.extend({
  actions: actions,
  history: browserHistory,
  init(){
    ReactDOM.render(CorpsMapHome, document.getElementById('root'));
  }
})

// for debugging only
window.app = app;
//-----------------

app.userStore = require('./stores/user_store');
app.teamStore = require('./stores/team_store');
app.layerStore = require('./stores/layer_store');

app.init();
