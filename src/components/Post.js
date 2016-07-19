import React from 'react';
import style from '../styles/Post.styl';

const Post = React.createClass({
  render(){
    const post = this.props.post;
    const postStyle= {
      backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,.33), rgba(0,0,0,0)), url("' + post.img + '")'

    }
    return (
      <div style={postStyle}className="post">
        <div className="post-title">{post.title}</div>
      </div>
    )
  }
})

export default Post;
