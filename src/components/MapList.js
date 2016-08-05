import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import app from 'ampersand-app';

const MapList = React.createClass({
  goToMyMaps(){
    app.history.push('/' + this.props.user.edipi + '/maps');
  },
  render(){
    const maps = this.props.user.maps;
    let ListElements;
    if(_.isEmpty(maps)){
      ListElements = <li className="list-group-item no-data-list-item">No Maps Yet</li>
    }else{
      ListElements = maps.map(function(map){
        // let iconClass = classnames({
        //   'glyphicon': true,
        //   'glyphicon-globe': team.role === 1,
        //   'glyphicon-off': team.role === 2,
        //   'glyphicon-user': team.role === 3
        // })
        return (
          <li key={team.teamId} className="list-group-item">
            <span className={iconClass} aria-hidden="true"></span>
            <span className="team-role">{team.roleDesc}</span>
            <span className="team-title">{team.title}</span>
          </li>
        )
      })
    }
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>My Maps</h4>
        </div>
        <ul className="list-group">
          {ListElements}
        </ul>
        <div className="panel-footer clearfix">
          <button onClick={this.goToMyMaps} type="button" className="btn btn-sm btn-info pull-right">Go to My Maps</button>
        </div>
      </div>
    )
  }
})

export default MapList;
