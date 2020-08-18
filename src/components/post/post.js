import React from "react";

import "./post.scss";

const Post = props => {
  return (
    <div className="card">
      <div className="card-body">{props.selftext}</div>
    </div>
  );
};
export default Post;
