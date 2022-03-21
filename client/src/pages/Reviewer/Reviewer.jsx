import React from "react";
import { Route, Routes } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import "./Reviewer.css";
import ReviewQuestions from "./ReviewQuestions";
import GenerateQuestionPaper from "./GenerateQuestionPaper";

import { FaPlus } from "react-icons/fa";
import CreateTopic from "./Topics/CreateTopic";
import ViewTopics from "./Topics/ViewTopics";

import CreateSubject from "./Subjects/CreateSubject";
import ViewSubjects from "./Subjects/ViewSubjects";
import { BsFillCheckSquareFill } from "react-icons/bs";
import EditSubject from "./Subjects/EditSubject";
import EditTopic from "./Topics/EditTopic";

const sidebarOptions = [
    {
        label: "Review Questions",
        highlighted: true,
        icon: <FaCheck />,
        link: "",
    },
    {
        label: "View Freezed Questions",
        icon: <BsFillCheckSquareFill />,
        link: "",
    },
    {
        label: "View Freezed Question",
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
    {
        label: "View Subjects",
        link: "",
    },
    {
        label: "View Topics",
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
            <Route
                path="/topic/create"
                element={<CreateTopic sidebarOptions={sidebarOptions} />}
            />
            <Route
                path="/topic/edit"
                element={<EditTopic sidebarOptions={sidebarOptions} />}
            />
            <Route
                path="/topic/view"
                element={<ViewTopics sidebarOptions={sidebarOptions} />}
            />
            <Route
                path="/subject/create"
                element={<CreateSubject sidebarOptions={sidebarOptions} />}
            />
            <Route
                path="/subject/edit"
                element={<EditSubject sidebarOptions={sidebarOptions} />}
            />
            <Route
                path="/subject/view"
                element={<ViewSubjects sidebarOptions={sidebarOptions} />}
            />
        </Routes>
    );
}

export default Reviewer;
