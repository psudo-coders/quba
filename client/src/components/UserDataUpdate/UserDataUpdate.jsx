import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { userInfo } from "../../api";
import { UserContext } from "../../context/UserContext";

function UserDataUpdate(props) {
    const { data } = useQuery("userInfo", userInfo, {
        retry: false,
    });

    const [_, setUserData] = useContext(UserContext);

    useEffect(() => {
        setUserData(data);
    }, [data]);

    return null;
}

export default UserDataUpdate;
