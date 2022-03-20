import React from "react";

function Button(props) {
    const { label, icon, full, alt } = props;

    return (
        <button
            className={`input-btn${full ? " full" : ""}${alt ? " alt" : ""}`}
            {...props}
        >
            {label}
            {icon}
        </button>
    );
}

export default Button;
