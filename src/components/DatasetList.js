import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import app from 'ampersand-app';

const DatasetList = React.createClass({
  goToMyData(){
    app.history.push('/' + this.props.user.edipi + '/data');
  },
  render(){
    const datasets = this.props.user.datasets;
    let ListElements;
    if(_.isEmpty(datasets)){
      ListElements = <li className="list-group-item no-data-list-item">No Datasets Yet</li>
    }else{
      ListElements = datasets.map(function(dataset){
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
          <h4>My Data</h4>
        </div>
        <ul className="list-group">
          {ListElements}
        </ul>
        <div className="panel-footer clearfix">
          <button onClick={this.goToMyData} type="button" className="btn btn-sm btn-info pull-right">Go to My Data</button>
        </div>
      </div>
    )
  }
})

export default DatasetList;
