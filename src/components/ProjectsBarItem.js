import React from 'react';

import style from '../styles/ProjectsBarItem.styl';

const ProjectsBarItem = React.createClass({
  render(){
    return (
      <div className="projectsBar-row-item">{this.props.name}</div>
    )
  }
})

export default ProjectsBarItem
