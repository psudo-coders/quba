import React, { useState } from "react";
import OptionInput from "../../components/OptionInputs/OptionInput";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import { FaArrowRight, FaEraser } from "react-icons/fa";
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
        subject: -1,
        topic: -1,
        difficulty: -1,
        statement: "",
        solution: "",
        options: [{ label: 0, value: "" }],
    });

    const addOption = () => {
        setQData((prev) => {
            let prevLabel = prev.options[prev.options.length - 1].label;
            return {
                ...prev,
                options: [...prev.options, { label: prevLabel + 1, value: "" }],
            };
        });
    };

    const SubmitQuestion = useMutation(
        (data) => {
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
                if (!res.ok) reject(new Error(res.error));
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
                        selected={qData.subject}
                        setSelected={(id) => {
                            setQData((prev) => {
                                return { ...prev, subject: id };
                            });
                        }}
                    />
                    <Dropdown
                        name={"Topic"}
                        options={dummyData.topics}
                        selected={qData.topic}
                        setSelected={(id) => {
                            setQData((prev) => {
                                return { ...prev, topic: id };
                            });
                        }}
                    />
                    <Dropdown
                        name={"Difficulty"}
                        options={dummyData.difficulty}
                        selected={qData.difficulty}
                        setSelected={(id) => {
                            setQData((prev) => {
                                return { ...prev, difficulty: id };
                            });
                        }}
                    />
                    {/*<PopupAlert*/}
                    {/*    className={"submit-question"}*/}
                    {/*    heading={"Submit Question"}*/}
                    {/*    middle={<FaEraser className={"eraser"} />}*/}
                    {/*    bottom={"Question submitted successfully"}*/}
                    {/*/>*/}
                </div>
            }
        >
            <div className={"submit-question-form"}>
                <AttachTextArea
                    heading={"Enter question details"}
                    placeholder={"Enter question statement"}
                    value={qData.statement}
                    onChange={(e) =>
                        setQData((prev) => {
                            return { ...prev, statement: e.target.value };
                        })
                    }
                />
                {qData.options.map((option, i) => (
                    <OptionInput
                        label={option.label}
                        value={option.value}
                        onChange={(e) =>
                            setQData((prev) => {
                                let tempOptions = prev.options;
                                tempOptions[i].value = e.target.value;
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
                    value={qData.solution}
                    onChange={(e) =>
                        setQData((prev) => {
                            return { ...prev, solution: e.target.value };
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
