import React from "react";
import { Route, Routes } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import "./Reviewer.css";
import ReviewQuestions from "./ReviewQuestions";
import GenerateQuestionPaper from "./GenerateQuestionPaper";

const sidebarOptions = [
    {
        label: "Review Questions",
        highlighted: true,
        icon: <FaCheck />,
        link: "",
    },
    {
        label: "View Freezed Questions",
        link: "",
    },
    {
        label: "Generate Question Paper",
        link: "",
    },
    {
        label: "Create Subject",
        link: "",
    },
    {
        label: "Create Topic",
        link: "",
    },
];

function Reviewer(props) {
    return (
        <Routes>
            <Route
                path=""
                element={<ReviewQuestions sidebarOptions={sidebarOptions} />}
            />
            <Route
                path="genquestionpaper"
                element={
                    <GenerateQuestionPaper sidebarOptions={sidebarOptions} />
                }
            />
        </Routes>
    );
}

export default Reviewer;
