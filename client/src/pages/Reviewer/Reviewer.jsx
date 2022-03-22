import React from "react";
import { Route, Routes } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import "./Reviewer.css";
import ReviewQuestions from "./ReviewQuestions";
import GenerateQuestionPaper from "./GenerateQuestionPaper";

import CreateTopic from "./Topics/CreateTopic";
import ViewTopics from "./Topics/ViewTopics";

import CreateSubject from "./Subjects/CreateSubject";
import ViewSubjects from "./Subjects/ViewSubjects";
import { BsFillCheckSquareFill } from "react-icons/bs";
import EditSubject from "./Subjects/EditSubject";
import EditTopic from "./Topics/EditTopic";
import FreezedQuestions from "./FreezedQuestions";
import Profile from "../Submitter/Profile/Profile";
import EditQuestion from "./EditQuestion";

const sidebarOptions = [
    {
        label: "Review Questions",
        highlighted: true,
        icon: <FaCheck />,
        link: "/reviewer",
    },
    {
        label: "View Freezed Questions",
        icon: <BsFillCheckSquareFill />,
        link: "/reviewer/question/freezed",
    },
    {
        label: "Generate Question Paper",
        link: "/reviewer/question/generate",
    },
    {
        label: "Create Subject",
        link: "/reviewer/subject/create",
    },
    {
        label: "Create Topic",
        link: "/reviewer/topic/create",
    },
    {
        label: "View Subjects",
        link: "/reviewer/subject/view",
    },
    {
        label: "View Topics",
        link: "/reviewer/topic/view",
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
                path="/question/freezed"
                element={<FreezedQuestions sidebarOptions={sidebarOptions} />}
            />
            <Route
                path="/question/generate"
                element={
                    <GenerateQuestionPaper sidebarOptions={sidebarOptions} />
                }
            />
            <Route
                path="/question/edit"
                element={<EditQuestion sidebarOptions={sidebarOptions} />}
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
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default Reviewer;
