import React from 'react';
import style from '../styles/DatasetList.styl';
import _ from 'lodash';
import classnames from 'classnames';
import app from 'ampersand-app';
import moment from 'moment';

let edipi;

const DatasetListItem = React.createClass({
  clickHandler(){
    let id = this.props.dataset.id;
    app.history.push('/' + edipi + '/data/' + id);
  },
  render(){
    const dataset = this.props.dataset;
    const dateUploaded = moment(dataset.uploadDt, 'YYYY-MM-DDTHH:mm:SZ').fromNow();
    const iconClass = classnames({
      'dataset-icon': true,
      'glyphicon': true,
      'glyphicon-send': dataset.geomType === 'POINT',
      'glyphicon-thumbs-up': dataset.geomType === 'LINE',
      'glyphicon-leaf': dataset.geomType === 'POLYGON'
    })
    return (
      <li onClick={this.clickHandler} className="list-group-item dataset-list-item">
        <span className={iconClass} aria-hidden="true"></span>
        <span className="">{dataset.name + ' v.' + dataset.version}</span>
        <span className="pull-right">{dateUploaded}</span>
        <p><span className="">{dataset.description}</span></p>
      </li>
    )
  }
})

const DatasetList = React.createClass({
  componentWillMount(){
    edipi = this.props.user.edipi;
  },
  render(){
    let _this = this;
    const datasets = this.props.user.datasets;
    let ListElements;
    if(_.isEmpty(datasets)){
      ListElements = <li className="list-group-item no-data-list-item">No Datasets Yet</li>
    }else{
      ListElements = datasets.map(function(dataset){
        return (
          <DatasetListItem key={dataset.id} dataset={dataset} />
        )
      })
    }
    return(
      <ul className="list-group">
        {ListElements}
      </ul>
    )
  }
})

export default DatasetList;
