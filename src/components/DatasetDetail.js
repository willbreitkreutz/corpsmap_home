import React from 'react';
import ReactDOM from 'react-dom';
import NavbarBackground from './NavbarBackground';
import DatasetToolbar from './DatasetToolbar';
import Lstyle from '../../node_modules/leaflet/dist/leaflet.css';
import style from '../styles/DatasetDetail.styl';
import L from 'leaflet';
import DatasetList from './DatasetList';
import DatasetDefaultStyle from './DatasetDefaultStyle';
import moment from 'moment';
import classnames from 'classnames';

let map;
let layerControl;

const DatasetDetailMap = React.createClass({
  createMap(el){
    map = L.map(el)
    let streetmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map);
    let darkstreetmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');
    let imagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    let basemaps = {
      'Light Basemap': streetmap,
      'Dark Basemap': darkstreetmap,
      'Imagery': imagery
    }
    layerControl = L.control.layers(basemaps, null, {position:'topright'}).addTo(map)
    map.setView([37.02, -12.5], 3);
  },
  addDataset(id){
    //let dataset = app.userStore.getDatasets({id: Number(id)})[0];
    let dataset = this.props.dataset;
    let datasetUrl = dataset.tiles;
    if(datasetUrl){
      let datasetLayer = L.tileLayer(datasetUrl).addTo(map);
      layerControl.addOverlay(datasetLayer, dataset.name);
      map.fitBounds([[dataset.minY, dataset.minX],[dataset.maxY, dataset.maxX]]);
    }
  },
  componentDidMount(){
    this.createMap(ReactDOM.findDOMNode(this));
    this.addDataset();
  },
  render(){
    return (
      <div id="map" className="dataset-detail-map"></div>
    )
  }
})


const DatasetDetail = React.createClass({
  getInitialState(){
    return this.getStateFromStores();
  },
  componentDidMount(){
    const _this = this;
    this._unlistener = app.userStore.listen(function(){
      _this.setState(_this.getStateFromStores());
    })
  },
  componentWillUnmount(){
    this._unlistener();
  },
  getStateFromStores(){
    let id = Number(this.props.params.id);
    return {
      dataset: app.userStore.getDatasets({id: Number(id)})[0],
      user: app.userStore.getUser()
    }
  },
  render(){
    var id = this.props.params.id;
    const dataset = this.state.dataset;
    const dateUploaded = moment(dataset.uploadDt, 'YYYY-MM-DDTHH:mm:SZ').fromNow();
    const iconClass = classnames({
      'dataset-icon': true,
      'glyphicon': true,
      'glyphicon-send': dataset.geomType === 'POINT',
      'glyphicon-thumbs-up': dataset.geomType === 'LINE',
      'glyphicon-leaf': dataset.geomType === 'POLYGON'
    })
    return (
      <div>
        <NavbarBackground />
        <div className="container">
          <div className="panel panel-default page-top-panel">
            <div className="panel-body">
              <span className={iconClass} aria-hidden="true"></span>
              <span className="">{dataset.name + ' v.' + dataset.version}</span>
              <span className="pull-right">{dateUploaded}</span>
              <p><span className="">{dataset.description}</span></p>
              <DatasetToolbar dataset={dataset} />
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <DatasetDetailMap datasetId={id} dataset={dataset} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Dataset Functionality</h4>
                </div>
                <div className="panel-body">
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Default Style</h4>
                </div>
                <div className="panel-body">
<DatasetDefaultStyle dataset={dataset} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default DatasetDetail;

//<DatasetDefaultStyle dataset={dataset} />
