import React from "react";

function Option(props) {
    const { label, icon } = props;

    return (
        <div className={"context-menu-option"}>
            <p>{label}</p>
            {icon}
        </div>
    );
}

export default Option;
