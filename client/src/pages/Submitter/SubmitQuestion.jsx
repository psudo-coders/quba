import React, { useState } from "react";
import OptionInput from "../../components/OptionInputs/OptionInput";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import Button from "../../components/Inputs/Button";
import Page from "../../components/Page/Page";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useMutation, useQuery } from "react-query";
import PopupAlert from "../../components/PopupAlert/PopupAlert";
import { questionCreate, subjectList } from "../../api";
import { useNavigate } from "react-router-dom";

const dummyData = {
    topics: ["Topic 1", "Topic 2"],
    difficulty: ["Easy", "Medium", "Hard"],
};


function SubmitQuestion(props) {
    const { sidebarOptions } = props;
    const [popupOpen, setPopupOpen] = useState(false);

    const [qData, setQData] = useState({
        subject: "6239e530f6554077a49bf55f",
        topic: "6239e584f6554077a49bf59b",
        // difficulty: -1,
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

    let {data: subjects} = useQuery("subjectList", subjectList);
    if (subjects === undefined) subjects = [];
    const subjectNames = subjects.map((subject) => subject.name);
    const subjectIds = subjects.map((subject) => subject._id);

    const SubmitQuestion = useMutation(
        questionCreate,
        {
            onSuccess: () => {
                console.log("success");
            },
            onError: () => {},
        }
    );
    const navigate = useNavigate();

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
                <div className={"dropdowns-container"}>
                    <Dropdown
                        name={"Subject"}
                        options={subjectNames}
                        selected={-1}
                        setSelected={(id) => {
                            setQData((prev) => {
                                return { ...prev, subject: subjectIds[id] };
                            });
                        }}
                    />
                    <Dropdown
                        name={"Topic"}
                        options={dummyData.topics}
                        selected={-1}
                        setSelected={(id) => {
                            setQData((prev) => {
                                return { ...prev, topic: id };
                            });
                        }}
                    />
                    <Dropdown
                        name={"Difficulty"}
                        options={dummyData.difficulty}
                        selected={-1}
                        setSelected={(id) => {
                            setQData((prev) => {
                                return { ...prev, difficulty: id };
                            });
                        }}
                    />
                </div>
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
            ) }
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
