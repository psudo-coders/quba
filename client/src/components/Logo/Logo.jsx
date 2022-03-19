import React from "react";
import { FiFile } from "react-icons/fi";

import "./Logo.css";

function Logo(props) {
    const { name, alt } = props;

    return (
        <div className={`logo${alt ? " alt" : ""}`}>
            <FiFile />
            <p>{name || "QUBA"}</p>
        </div>
    );
}

export default Logo;
