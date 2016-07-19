import React from 'react';
import ProjectsBarItem from './ProjectsBarItem';
import style from '../styles/ProjectsBar.styl';

const projectsList = [
  'CorpsMap Xenon',
  'CorpsMap Argon',
  'Data Manager',
  'Map Builder',
  'Developer Docs'
]

const ProjectsBar = React.createClass({
  render(){
    return (
      <div className="container-fluid projectsBar">
        <div className="container projectsBar-row">
          {
            projectsList.map((project) => <ProjectsBarItem key={project} name={project} />)
          }
        </div>
      </div>
    )
  }
})

export default ProjectsBar;
