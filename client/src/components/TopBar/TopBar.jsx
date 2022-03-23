import React from "react";
import { FaBell } from "react-icons/fa";

import "./TopBar.css";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function TopBar(props) {
    const { search } = props;

    const [userData] = React.useContext(UserContext);

    const goto = useNavigate();

    return (
        <div className={"topbar"}>
            {search && search}
            <div className={"topbar-profile"}>
                <p>{userData?.username || "Unknown"}</p>
                <img
                    src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Clipart.png"
                    alt="avatar"
                    onClick={() => goto("/submitter/profile")}
                />
                <FaBell />
            </div>
        </div>
    );
}

export default TopBar;
