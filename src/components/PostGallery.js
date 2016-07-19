import React from 'react';
import Post from './Post';
import posts from '../data/posts';

import style from '../styles/PostGallery.styl';

const PostGallery = React.createClass({
  render(){
    return (
      <div className="container">
        <div className="posts-gallery">
          {
            posts.map((post) => <Post key={post.id} post={post} />)
          }
        </div>
      </div>
    )
  }
})

export default PostGallery;
