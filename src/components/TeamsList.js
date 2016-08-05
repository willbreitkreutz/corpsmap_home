import React from 'react';
import style from '../styles/TeamsList.styl';
import _ from 'lodash';
import classnames from 'classnames';
import app from 'ampersand-app';

const TeamItem = React.createClass({
  openTeam(){
    app.actions.loadTeam(this.props.team.teamId);
    app.history.push('/team/' + this.props.team.teamId);
  },
  render(){
    const team = this.props.team;
    let iconClass = classnames({
      'team-icon': true,
      'glyphicon': true,
      'glyphicon-globe': team.role === 1,
      'glyphicon-off': team.role === 2,
      'glyphicon-user': team.role === 3
    })
    return (
      <li onClick={this.openTeam} className="list-group-item team-list-item">
        <span className={iconClass} aria-hidden="true"></span>
        <span className="team-role">{team.roleDesc}</span>
        <span className="team-title"><h4>{team.title}</h4></span>
      </li>
    )
  }
})

const TeamsList = React.createClass({
  openTeam(){

  },
  render(){
    const teams = this.props.teams;
    let ListElements;
    if(_.isEmpty(teams)){
      ListElements = <li className="list-group-item no-data-list-item">No Teams Yet</li>
    }else{
      ListElements = teams.map(function(team){
        return (
          <TeamItem key={team.teamId} team={team} />
        )
      })
    }
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>My Teams</h4>
          <p>Share your data with your team, and see datasets shared by other team members.</p>
        </div>
        <ul className="list-group">
          {ListElements}
        </ul>
        <div className="panel-footer clearfix">
          <button type="button" className="btn btn-sm btn-info pull-right">Request New Team</button>
        </div>
      </div>
    )
  }
})

export default TeamsList;
