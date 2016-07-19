import React from 'react';
import NavbarBackground from './NavbarBackground';
import style from '../styles/MyData.styl';
import DataDropTarget from './DataDropTarget';
import ServiceLinkForm from './ServiceLinkForm';
import classnames from 'classnames';

const MyData = React.createClass({
  getInitialState(){
    return ({
      mode:'default'
    })
  },
  uploadDataState(){
    this.setState({mode:'upload'});
  },
  connectServiceState(){
    this.setState({mode:'service'});
  },
  cancelState(){
    this.setState({mode:'default'});
  },
  render(){
    const mode = this.state.mode;
    const Components = mode === 'upload' ? [DataDropTarget] : mode === 'service' ? [ServiceLinkForm] : [];

    const addDataButtonClass = classnames({
      'btn-group': true,
      'pull-right': true,
      'hidden': mode !== 'default'
    })

    const cancelButtonClass = classnames({
      'btn': true,
      'btn-danger': true,
      'pull-right': true,
      'hidden': mode === 'default'
    })

    return (
      <div>
        <NavbarBackground />
        <div className="container">
          <div className="panel panel-default page-top-panel">
            <div className="panel-body">
              {Components.map(function(Comp){
                return <Comp key={Comp.displayName} />
              })}
              <div className={addDataButtonClass} role="group" aria-label="add datasets by upload or service connection">
                <button onClick={this.uploadDataState} type="button" className="btn btn-info">Upload Dataset</button>
                <button onClick={this.connectServiceState} type="button" className="btn btn-warning">Connect to a Service</button>
              </div>
              <button onClick={this.cancelState} type="button" className={cancelButtonClass}>Cancel</button>
            </div>
            <ul className="list-group">
              <li className="list-group-item no-data-list-item">No Datasets yet, add one above!</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
})

export default MyData;
