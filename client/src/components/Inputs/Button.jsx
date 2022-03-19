import React from "react";

function Button(props) {
  const { label } = props;

  return <button className={"input-btn"}>{label}</button>;
}

export default Button;
