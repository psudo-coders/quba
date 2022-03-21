import React from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import { Roles, userInfo } from "../../api";

function Home(props) {
    const { data, isLoading, isError, mutateAsync, isIdle } = useMutation(userInfo);
    if (isIdle) {
        mutateAsync();
    }
    const goto = useNavigate();
    if (isError) goto("/login");
    else if (!isLoading && data != undefined) {
        switch (data.role) {
            case Roles.ADMIN:
                goto("/admin");
            case Roles.REVIEWER:
                goto("/reviewer");
            case Roles.SUBMITTER:
                goto("/submitter");
        }
    }
    return <div>Loading...</div>;

}

export default Home;
