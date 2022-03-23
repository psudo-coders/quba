import React, { useState } from "react";
import Page from "../../components/Page/Page";
import CheckboxOptions from "../../components/CheckboxOptions/CheckboxOptions";
import Button from "../../components/Inputs/Button";
import { FaArrowRight } from "react-icons/fa";
import Input from "../../components/Inputs/Input";
import GenerateQuestionPaperPopup from "./GenerateQuestionPaperPopup";
import useDropdownData from "../../hooks/useDropdownData";
import { topicList } from "../../api";
import { useNavigate } from "react-router-dom";

const difficulties = [
    {
        label: "Easy",
    },
    {
        label: "Medium",
    },
    {
        label: "Hard",
    },
];

function GenerateQuestionPaper(props) {
    const { sidebarOptions } = props;

    const [popupOpen, setPopupOpen] = useState(false);

    const goto = useNavigate();

    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState([]);
    const [questionCount, setQuestionCount] = useState();

    const [topicsData, tIsSuccess] = useDropdownData("topicList", topicList);

    const handleClick = () => {
        setPopupOpen(true);
    };

    return (
        <Page
            className={"generate-question-paper"}
            sidebarOptions={sidebarOptions}
            heading={"Generate Question Paper"}
            subHeading={"Your question description"}
        >
            <div className="page-content">
                <div className="section">
                    <CheckboxOptions
                        options={topicsData.map((topic) => {
                            return { label: topic.name };
                        })}
                        label={"Select Topics"}
                        selectedIdxs={selectedTopics}
                        onOptionClick={(i) => {
                            if (!selectedTopics.includes(i))
                                setSelectedTopics((prev) => [...prev, i]);
                            else
                                setSelectedTopics((prev) =>
                                    prev.splice(prev.indexOf(i), 1)
                                );
                        }}
                    />
                </div>
                <div className="section">
                    <CheckboxOptions
                        options={difficulties}
                        label={"Select Difficulty"}
                        selectedIdxs={selectedDifficulty}
                        onOptionClick={(i) => {
                            if (!selectedDifficulty.includes(i))
                                setSelectedDifficulty((prev) => [...prev, i]);
                            else
                                setSelectedDifficulty((prev) =>
                                    prev.splice(prev.indexOf(i), 1)
                                );
                        }}
                    />
                </div>
                <div className="section">
                    <h1>Other Operations</h1>
                    <Input
                        placeholder={"No. of questions in question paper"}
                        value={questionCount}
                        onChange={(e) =>
                            setQuestionCount(
                                isNaN(e.target.value) || e.target.value === ""
                                    ? 0
                                    : parseInt(e.target.value)
                            )
                        }
                    />
                    <Input placeholder={"Sets of Question Paper to Generate"} />

                    {/*<CheckboxOptions*/}
                    {/*    options={[{ label: "Shuffle Options" }]}*/}
                    {/*    selectedIdxs={1}*/}
                    {/*/>*/}
                </div>
            </div>
            <Button
                alt
                full
                label={"Generate Question Papers"}
                icon={<FaArrowRight />}
                onClick={() => {
                    handleClick();
                    setTimeout(() => {
                        goto("/reviewer/question/generated");
                    }, 2000);
                }}
            />
            {popupOpen && <GenerateQuestionPaperPopup setOpen={setPopupOpen} />}
        </Page>
    );
}

export default GenerateQuestionPaper;
