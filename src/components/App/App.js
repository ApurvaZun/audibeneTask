import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/commentsAction";
import ConnectedForm from "../commentForm/commentForm";
import Comments from "../comments/comments";
import Header from "../Header/header";
import Post from "../post/post";

import "./app.scss";

class App extends Component {
  componentDidMount() {
    this.props.getComments();
  }

  render() {
    const renderEle = this.props.error ? (
      <div> {this.props.error} </div>
    ) : (
      <div className="container">
        <Header
          author={this.props.post.author}
          title={this.props.post.title}
          score={this.props.post.score}
        />
        <div className="container post-rectangle">
          <Post selftext={this.props.post.selftext} />
          <ConnectedForm />
          <Comments comments={this.props.comments} />
        </div>
      </div>
    );
    return <div>{renderEle}</div>;
  }
}

const mapStateToProps = state => {
  return {
    post: state.post,
    error: state.error,
    comments: state.comments,
    originalComment: state.originalComment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getComments: () => dispatch(actions.getComments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
