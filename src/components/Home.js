import React from 'react';
import Hero from './Hero'
import ProjectsBar from './ProjectsBar';
import PostGallery from './PostGallery';

const Home = React.createClass({
  render(){
    return (
      <div>
        <Hero />
        <ProjectsBar />
        <PostGallery />
      </div>
    )
  }
})

export default Home;
