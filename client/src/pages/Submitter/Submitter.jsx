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
import ViewQuestionPopup from "./ViewQuestionPopup";

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
            <ViewQuestionPopup />
            {/*<Route*/}
            {/*    path="/submitter"*/}
            {/*    element={<SubmitQuestion sidebarOptions={sidebarOptions} />}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    path="myquestions"*/}
            {/*    element={<YourQuestions sidebarOptions={sidebarOptions} />}*/}
            {/*/>*/}
        </>
    );
}

export default Submitter;
