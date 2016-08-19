import React from 'react';
import app from 'ampersand-app';
import DatasetList from './DatasetList';

const MeMyData= React.createClass({
  goToMyData(){
    app.history.push('/' + this.props.user.edipi + '/data');
  },
  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>My Data</h4>
        </div>

        <DatasetList user={this.props.user} />

        <div className="panel-footer clearfix">
          <button onClick={this.goToMyData} type="button" className="btn btn-sm btn-info pull-right">Go to My Data</button>
        </div>
      </div>
    )
  }
})

export default MeMyData;
