import React from "react";
import OptionInput from "../../components/OptionInputs/OptionInput";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import { FaArrowRight } from "react-icons/fa";
import Button from "../../components/Inputs/Button";
import Page from "../../components/Page/Page";

function SubmitQuestion(props) {
    const { sidebarOptions } = props;

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Submit Question"}
            subHeading={"Submit your question description"}
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
            <Button
                label={"Submit Question"}
                icon={<FaArrowRight />}
                full
                alt
            />
        </Page>
    );
}

export default SubmitQuestion;
