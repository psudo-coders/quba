import React from "react";
import Popup from "../../components/Popup/Popup";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import OptionInput from "../../components/OptionInputs/OptionInput";

function ViewQuestionPopup(props) {
    return (
        <Popup>
            <div className={"submit-question-form"}>
                <AttachTextArea
                    heading={"View Question (#QID)"}
                    placeholder={"Question statement"}
                    noAttach
                />
                {["A", "B", "C", "D"].map((option) => (
                    <OptionInput label={option} noOptions />
                ))}
                <AttachTextArea
                    heading={"Enter solution details"}
                    placeholder={"Question solution"}
                    noAttach
                />
            </div>
        </Popup>
    );
}

export default ViewQuestionPopup;
