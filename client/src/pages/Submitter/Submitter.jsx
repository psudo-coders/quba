import React from "react";
import { Route, Routes } from "react-router-dom";
import SubmitQuestion from "./SubmitQuestion";
import { FaPlus } from "react-icons/fa";

import "./Submitter.css";
import YourQuestions from "./YourQuestions";
import Profile from "./Profile/Profile";

const sidebarOptions = [
    {
        label: "Submit Question",
        highlighted: true,
        icon: <FaPlus />,
        link: "/submitter",
    },
    {
        label: "Your Questions",
        link: "/submitter/questions",
    },
];

function Submitter(props) {
    return (
        <Routes>
            <Route
                path=""
                element={<SubmitQuestion sidebarOptions={sidebarOptions} />}
            />
            <Route
                path="/questions"
                element={<YourQuestions sidebarOptions={sidebarOptions} />}
            />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
}

export default Submitter;
