import React from 'react';
import Navbar from './Navbar';
import Toaster from './Toaster';

const PageContainer = React.createClass({
  render(){
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Toaster />
      </div>
    )
  }
})

export default PageContainer;
