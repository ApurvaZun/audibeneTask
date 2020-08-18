import React from "react";

import "./header.scss";

const Header = props => {
  return (
    <div>
      {" "}
      <p className="post-author">{props.author}</p>
      <p>
        {" "}
        {props.score} <span className="post-title">{props.title}</span>{" "}
      </p>
    </div>
  );
};
export default Header;
