import React from "react";
import { FiFile } from "react-icons/fi";

import "./Logo.css";
import { useNavigate } from "react-router-dom";

function Logo(props) {
    const { name, alt } = props;

    const goto = useNavigate();

    return (
        <div className={`logo${alt ? " alt" : ""}`} onClick={() => goto("/")}>
            <FiFile />
            <p>{name || "QUBA"}</p>
        </div>
    );
}

export default Logo;
