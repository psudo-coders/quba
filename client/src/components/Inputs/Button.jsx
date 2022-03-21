import React from "react";

function Button(props) {
    const { label, icon, full, alt, ...passingProps } = props;

    return (
        <button
            className={`input-btn${full ? " full" : ""}${alt ? " alt" : ""}`}
            {...passingProps}
        >
            {label}
            {icon}
        </button>
    );
}

export default Button;
