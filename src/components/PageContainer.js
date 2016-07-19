import React from 'react';
import Navbar from './Navbar'

const PageContainer = React.createClass({
  render(){
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
})

export default PageContainer;
