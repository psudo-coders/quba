import React from "react";
import OptionInput from "../../components/OptionInputs/OptionInput";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import { FaArrowRight } from "react-icons/fa";
import Button from "../../components/Inputs/Button";
import Page from "../../components/Page/Page";

function EditQuestion(props) {
    const { sidebarOptions } = props;

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Edit Question"}
            subHeading={"Edit your question description"}
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
