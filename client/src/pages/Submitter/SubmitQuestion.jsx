import React, { useState } from "react";
import OptionInput from "../../components/OptionInputs/OptionInput";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import Button from "../../components/Inputs/Button";
import Page from "../../components/Page/Page";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useMutation } from "react-query";
import PopupAlert from "../../components/PopupAlert/PopupAlert";

const dummyData = {
    subjects: ["Subject 1", "Subject 2"],
    topics: ["Topic 1", "Topic 2"],
    difficulty: ["Easy", "Medium", "Hard"],
};

function SubmitQuestion(props) {
    const { sidebarOptions } = props;
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

    const SubmitQuestion = useMutation(
        (data) => {
            console.log(qData);
            return new Promise(async (resolve, reject) => {
                let res = await fetch("/api/question/create", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                res = await res.json();
                // if (!res.ok) reject(new Error(res.error));
                resolve(res);
            });
        },
        {
            onSuccess: () => {
                console.log("success");
            },
            onError: () => {},
        }
    );

    const doSubmit = () => {
        console.log(qData);
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
                        options={dummyData.subjects}
                        selected={-1}
                        setSelected={(id) => {
                            setQData((prev) => {
                                return { ...prev, subject: id };
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
            {SubmitQuestion.isSuccess && (
                <PopupAlert
                    className={"remove-question"}
                    heading={"Submit Question"}
                    middle={<FaCheck className={"eraser"} />}
                    bottom={"Question submitted"}
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
