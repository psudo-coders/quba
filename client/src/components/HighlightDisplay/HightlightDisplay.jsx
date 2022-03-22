import React from "react";

import "./HighlightDisplay.css";

function HightlightDisplay(props) {
    const { name } = props;

    return <div className={"highlight-display"}>{name}</div>;
}

export default HightlightDisplay;
