import React from "react";
import { Route, Routes } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import CreateTopic from "./Topics/CreateTopic";
import ViewTopics from "./Topics/ViewTopics";

import "./Reviewer.css";
import CreateSubject from "./Subjects/CreateSubject";
import ViewSubjects from "./Subjects/ViewSubjects";
import { BsFillCheckSquareFill } from "react-icons/bs";
import EditSubject from "./Subjects/EditSubject";
import EditTopic from "./Topics/EditTopic";

const sidebarOptions = [
    {
        label: "Review Questions",
        highlighted: true,
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
