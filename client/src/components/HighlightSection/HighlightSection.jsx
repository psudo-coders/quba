import React from "react";

import "./HighlightSection.css";

function HighlightSection(props) {
    const { heading, children, className } = props;

    return (
        <div
            className={"highlight-section" + (className ? " " + className : "")}
        >
            <h3>{heading}</h3>
            {children}
        </div>
    );
}

export default HighlightSection;
