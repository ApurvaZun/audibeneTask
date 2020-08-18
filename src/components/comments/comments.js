import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/commentsAction";
import ConnectedForm from "../commentForm/commentForm";

const Comments = props => {
  return props.comments == null ? (
    <div className="container">
      <div> Loading...... </div>
    </div>
  ) : (
    Object.keys(props.comments).map((comments, index) => (
      <div key={props.comments[comments].id}>
        <div>
          {" "}
          <span className="comment-author">
            {props.comments[comments].author}
          </span>{" "}
          &nbsp;&nbsp;
          <span>{props.comments[comments].body} </span>
          <ConnectedForm parentId={props.comments[comments].id} />
        </div>
        {props.comments[comments].children != null ? (
          <ul>
            <Comments comments={props.comments[comments].children} />
          </ul>
        ) : null}
      </div>
    ))
  );
};
export default Comments;
