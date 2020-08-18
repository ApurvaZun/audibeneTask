import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/commentsAction";

function generateId(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      id: null,
      created_utc: null,
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const comment = {};
    comment["body"] = this.state.body;
    comment["id"] = "t1_f" + generateId(6);
    comment["created_utc"] = new Date();
    comment["author"] = this.state.name;
    comment["parent_id"] = this.props.parentId;

    this.setState({ name: "", body: "" });
    this.props.addComments(comment);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  render() {
    const { body, name } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="enter your name"
          value={name}
          onChange={this.handleChange}
        />
        &nbsp;
        <textarea
          type="text"
          className="form-control"
          id="body"
          placeholder="enter your comment"
          value={body}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn-success mt-2">
          save
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComments: comments => dispatch(actions.addComments(comments))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ConnectedForm);
