import React, { useState } from "react";
import OptionInput from "../../components/OptionInputs/OptionInput";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import Button from "../../components/Inputs/Button";
import Page from "../../components/Page/Page";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useMutation } from "react-query";
import PopupAlert from "../../components/PopupAlert/PopupAlert";
import { questionCreate, subjectList, topicList } from "../../api";
import useDropdownData from "../../hooks/useDropdownData";
import { difficulties } from "../../config/difficulties";
import { useNavigate } from "react-router-dom";

function SubmitQuestion(props) {
    const { sidebarOptions } = props;

    const [popupOpen, setPopupOpen] = useState(false);

    const [dSubject, setDSubject] = useState(-1);
    const [dTopic, setDTopic] = useState(-1);

    const [qData, setQData] = useState({
        subject: -1,
        topic: -1,
        difficulty: -1,
        statement: { text: "" },
        solution: { text: "" },
        correctAnswer: 1,
        options: [{ id: 0, text: "" }],
    });

    const addOption = () => {
        setQData((prev) => {
            let prevLabel = prev.options[prev.options.length - 1].id;
            return {
                ...prev,
                options: [...prev.options, { id: prevLabel + 1, text: "" }],
            };
        });
    };

    const [topicsData, tIsSuccess] = useDropdownData("topicList", topicList);
    const [subjectsData, sIsSuccess] = useDropdownData(
        "subjectList",
        subjectList
    );
    const navigate = useNavigate();

    const SubmitQuestion = useMutation(questionCreate, {
        onSuccess: () => {
            console.log("success");
        },
        onError: () => {},
    });

    const doSubmit = () => {
        console.log(qData);
        setPopupOpen(true);
        console.log(popupOpen);
        SubmitQuestion.mutate(qData);
    };

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Submit Question"}
            subHeading={"Submit your question description"}
            dropdowns={
                sIsSuccess &&
                tIsSuccess && (
                    <div className={"dropdowns-container"}>
                        <Dropdown
                            name={"Subject"}
                            options={subjectsData.map(
                                (subject) => subject.name
                            )}
                            selected={dSubject}
                            setSelected={(i) => {
                                setQData((prev) => {
                                    console.log(subjectsData[i]);
                                    setDSubject(i);
                                    return {
                                        ...prev,
                                        subject: subjectsData[i]?._id || -1,
                                    };
                                });
                            }}
                        />
                        <Dropdown
                            name={"Topic"}
                            options={topicsData.map((topic) => topic.name)}
                            selected={dTopic}
                            setSelected={(i) => {
                                setQData((prev) => {
                                    setDTopic(i);
                                    return {
                                        ...prev,
                                        topic: topicsData[i]?._id || -1,
                                    };
                                });
                            }}
                        />
                        <Dropdown
                            name={"Difficulty"}
                            options={difficulties}
                            selected={qData.difficulty}
                            setSelected={(id) => {
                                setQData((prev) => {
                                    return { ...prev, difficulty: id };
                                });
                            }}
                        />
                    </div>
                )
            }
        >
            {SubmitQuestion.isSuccess && popupOpen && (
                <PopupAlert
                    className={"remove-question"}
                    heading={"Submit Question"}
                    middle={<FaCheck className={"eraser"} />}
                    bottom={"Question submitted"}
                    setOpen={setPopupOpen}
                />
            )}
            <div className={"submit-question-form"}>
                <AttachTextArea
                    heading={"Enter question details"}
                    placeholder={"Enter question statement"}
                    value={qData.statement.text}
                    onChange={(e) =>
                        setQData((prev) => {
                            return {
                                ...prev,
                                statement: { text: e.target.value },
                            };
                        })
                    }
                />
                {qData.options.map((option, i) => (
                    <OptionInput
                        label={option.id}
                        value={option.value}
                        onChange={(e) =>
                            setQData((prev) => {
                                let tempOptions = prev.options;
                                tempOptions[i].text = e.target.value;
                                return { ...prev, options: tempOptions };
                            })
                        }
                    />
                ))}
                <p className="add-option" onClick={addOption}>
                    Add option +
                </p>
                <AttachTextArea
                    heading={"Enter solution details"}
                    placeholder={"Enter question solution"}
                    value={qData.solution.text}
                    onChange={(e) =>
                        setQData((prev) => {
                            return {
                                ...prev,
                                solution: { text: e.target.value },
                            };
                        })
                    }
                />
            </div>
            <Button
                label={"Submit Question"}
                icon={<FaArrowRight />}
                full
                alt
                onClick={doSubmit}
            />
        </Page>
    );
}

export default SubmitQuestion;
