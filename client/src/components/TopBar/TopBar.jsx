import React from "react";
import { FaBell } from "react-icons/fa";

import "./TopBar.css";

function TopBar(props) {
    const { name } = props;

    return (
        <div className={"topbar"}>
            <p>{"Lovesh Verma"}</p>
            <img
                src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Clipart.png"
                alt="avatar"
            />
            <FaBell />
        </div>
    );
}

export default TopBar;
