import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useMatch,
} from "react-router-dom";
import SubmitQuestion from "./SubmitQuestion";
import { FaPlus } from "react-icons/fa";

import "./Submitter.css";
import YourQuestions from "./YourQuestions";

const sidebarOptions = [
    {
        label: "Submit Question",
        highlighted: true,
        icon: <FaPlus />,
        link: "",
    },
    {
        label: "Your Questions",
        link: "",
    },
];

function Submitter(props) {
    return (
        <>
            {/*<SubmitQuestion sidebarOptions={sidebarOptions} />*/}
            <YourQuestions sidebarOptions={sidebarOptions} />
        </>
    );
}

export default Submitter;
