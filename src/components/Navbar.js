import React from 'react';
import { Link } from 'react-router';
import app from 'ampersand-app';
import _ from 'lodash';
import style from '../styles/Navbar.styl';

const LoginBtn = React.createClass({
  displayName: 'LoginBtn',
  login(){
    app.actions.login();
  },
  render(){
    return (
      <li>
        <button onClick={this.login} className="nav-login">
          Login
        </button>
      </li>
    )
  }
})

const MyAccountBtn = React.createClass({
  displayName: 'MyAccountBtn',
  render(){
    const edipi = this.props.user.edipi;
    return (
      <li>
        <Link to={'/'+ edipi + '/me'} activeClassName="nav-active">
          My Account
        </Link>
      </li>
    )
  }
})

const MyDataBtn = React.createClass({
  displayName: 'MyDataBtn',
  render(){
    const edipi = this.props.user.edipi;
    return (
      <li>
        <Link to={'/'+ edipi + '/data'} activeClassName="nav-active">
          My Data
        </Link>
      </li>
    )
  }
})

const MyMapsBtn = React.createClass({
  displayName: 'MyMapsBtn',
  render(){
    const edipi = this.props.user.edipi;
    return (
      <li>
        <Link to={'/'+ edipi + '/maps'} activeClassName="nav-active">
          My Maps
        </Link>
      </li>
    )
  }
})

const LogoutBtn = React.createClass({
  displayName: 'LogoutBtn',
  logout(e){
    e.preventDefault();
    app.actions.logout();
  },
  render(){
    return (
      <li><a href="#" onClick={this.logout}>Logout</a></li>
    )
  }
})

const Navbar = React.createClass({
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
  componentDidMount(){
    const _this = this;
    this._unlistener = app.userStore.listen(function(){
      _this.setState(_this._getStateFromStores());
      if(_.isEmpty(_this.state.user)) app.history.push('/');
    })
  },
  componentWillUnmount(){
    this._unlistener();
  },
  render(){
    const ButtonComponents = _.isEmpty(this.state.user) ? [LoginBtn] : [MyDataBtn, MyMapsBtn, MyAccountBtn, LogoutBtn];
    const user = this.state.user;
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              CorpsMap 3.0
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/project/xenon">Viewer</a></li>
            {
              ButtonComponents.map(function(Comp){
                return <Comp key={Comp.displayName} user={user}/>
              })
            }
          </ul>
        </div>
      </nav>
    )
  },
  _getStateFromStores(){
    return {
      user: app.userStore.getUser()
    }
  }
})

export default Navbar;
