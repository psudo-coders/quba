import React from "react";

import "./Inputs.css";

function Input(props) {
    const { light } = props;
    return <input className={"input" + (light ? " light" : "")} {...props} />;
}

Input.defaultProps = {
    light: false,
};

export default Input;
