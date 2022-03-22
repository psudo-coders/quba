import React from "react";
import { UserContext } from "../../context/UserContext";

import "./ProfileInfo.css";

function ProfileInfo(props) {
    const [userData] = React.useContext(UserContext);

    return (
        <div className={"profile-info-container"}>
            <p>
                <span>Name: </span>
                {userData?.username}
            </p>
            <p>
                <span>Email: </span>
                {userData?.email}
            </p>
            <p>
                <span>Phone: </span>
                {userData?.phone}
            </p>
        </div>
    );
}

export default ProfileInfo;
