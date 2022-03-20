import React from "react";
import { FaBell } from "react-icons/fa";

import "./TopBar.css";

function TopBar(props) {
    const { name, search } = props;

    return (
        <div className={"topbar"}>
            {search && search}
            <div className={"topbar-profile"}>
                <p>{"Lovesh Verma"}</p>
                <img
                    src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Clipart.png"
                    alt="avatar"
                />
                <FaBell />
            </div>
        </div>
    );
}

export default TopBar;
