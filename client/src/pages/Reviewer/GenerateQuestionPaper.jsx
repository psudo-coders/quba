import React, { useState } from "react";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import CheckboxOptions from "../../components/CheckboxOptions/CheckboxOptions";
import Button from "../../components/Inputs/Button";
import { FaArrowRight } from "react-icons/fa";
import Input from "../../components/Inputs/Input";
import GenerateQuestionPaperPopup from "./GenerateQuestionPaperPopup";

const topics = [
    {
        label: "Topic 1",
    },
    {
        label: "Topic 1",
    },
    {
        label: "Topic 1",
    },
    {
        label: "Topic 1",
    },
    {
        label: "Topic 1",
    },
];

function GenerateQuestionPaper(props) {
    const { sidebarOptions } = props;

    const [popupOpen, setPopupOpen] = useState(false);

    const handleClick = () => {
        setPopupOpen(true);
    };

    return (
        <Page
            className={"generate-question-paper"}
            sidebarOptions={sidebarOptions}
            heading={"Review Questions"}
            subHeading={"Your question description"}
            search={<SearchBar placeholder={"Search Question"} />}
        >
            <div className="page-content">
                <div className="section">
                    <CheckboxOptions
                        options={topics}
                        label={"Select Topics"}
                        selectedIdx={1}
                    />
                </div>
                <div className="section">
                    <h1>Other Operations</h1>
                    <Input placeholder={"No. of questions in question paper"} />
                    <Input placeholder={"Sets of Question Paper to Generate"} />

                    <CheckboxOptions
                        options={[{ label: "Shuffle Options" }]}
                        selectedIdx={1}
                    />
                </div>
            </div>
            <Button
                alt
                full
                label={"Generate Question Papers"}
                icon={<FaArrowRight />}
                onClick={handleClick}
            />
            {popupOpen && <GenerateQuestionPaperPopup setOpen={setPopupOpen} />}
        </Page>
    );
}

export default GenerateQuestionPaper;
