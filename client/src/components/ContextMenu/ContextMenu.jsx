import React from "react";

import "./ContextMenu.css";
import Option from "./Option";

function ContextMenu(props) {
    const { options } = props;

    return (
        <div className={"context-menu"}>
            {options.map((option) => (
                <Option {...option} />
            ))}
        </div>
    );
}

export default ContextMenu;
