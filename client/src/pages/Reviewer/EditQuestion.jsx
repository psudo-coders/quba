import React, { useState } from "react";
import OptionInput from "../../components/OptionInputs/OptionInput";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import { FaArrowRight } from "react-icons/fa";
import Button from "../../components/Inputs/Button";
import Page from "../../components/Page/Page";
import Dropdown from "../../components/Dropdown/Dropdown";

function EditQuestion(props) {
    const { sidebarOptions } = props;

    const [status, setStatus] = useState(-1);
    const [subject, setSubject] = useState(-1);
    const [difficulty, setDifficulty] = useState(-1);

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Edit Question"}
            subHeading={"Edit your question description"}
            dropdowns={
                <div className={"dropdowns-container"}>
                    <Dropdown
                        name={"Status"}
                        options={[]}
                        selected={status}
                        setSelected={setStatus}
                    />
                    <Dropdown
                        name={"Status"}
                        options={[]}
                        selected={subject}
                        setSelected={setSubject}
                    />
                    <Dropdown
                        name={"Status"}
                        options={[]}
                        selected={difficulty}
                        setSelected={setDifficulty}
                    />
                </div>
            }
        >
            <div className={"submit-question-form"}>
                <AttachTextArea
                    heading={"Enter question details"}
                    placeholder={"Enter question statement"}
                />
                {["A", "B", "C", "D"].map((option) => (
                    <OptionInput label={option} />
                ))}
                <AttachTextArea
                    heading={"Enter solution details"}
                    placeholder={"Enter question solution"}
                />
            </div>
            <Button label={"Save Question"} icon={<FaArrowRight />} full alt />
        </Page>
    );
}

export default EditQuestion;
