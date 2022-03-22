import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useQuery } from "react-query";
import { Roles, userInfo } from "../../api";
import { UserContext } from "../../context/UserContext";

function Home(props) {
    const { data, isLoading, isError } = useQuery("userInfo", userInfo, {
        retry: false,
    });

    const [_, setUserData] = React.useContext(UserContext);

    useEffect(() => {
        setUserData(data);
    }, [data]);

    console.log("a");

    if (isError) return <Navigate to="/login" />;
    // TODO(luckshya): styling
    if (isLoading) return <div className="blue-screen"></div>;
    switch (data.role) {
        case Roles.ADMIN:
            return <Navigate to="/admin" />;
        case Roles.SUBMITTER:
            return <Navigate to="/submitter" />;
        case Roles.REVIEWER:
            return <Navigate to="/reviewer" />;
    }
}

export default Home;
