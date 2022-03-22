import React from "react";
import { Navigate } from "react-router";
import { useQuery } from "react-query";
import { Roles, userInfo } from "../../api";

function Home(props) {
    const { data, isLoading, isError } = useQuery("userInfo", userInfo, {
        retry: false,
    });

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
