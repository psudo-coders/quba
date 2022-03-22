import React from "react";
import Popup from "../../components/Popup/Popup";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import OptionInput from "../../components/OptionInputs/OptionInput";
import HighlightSection from "../../components/HighlightSection/HighlightSection";

import "./YourQuestionPopup.css";
import HightlightDisplay from "../../components/HighlightDisplay/HightlightDisplay";

function ViewQuestionPopup({ setOpen }) {
    return (
        <Popup setOpen={setOpen} heading={"View Question(#QID)"}>
            <HighlightSection className={"view-question"}>
                <div className={"question-options"}>
                    <HightlightDisplay name={"English"} />
                    <HightlightDisplay name={"Grammar"} />
                    <HightlightDisplay name={"Hard"} />
                </div>
                <AttachTextArea placeholder={"Question statement"} noAttach />
                {["A", "B", "C", "D"].map((option, i) => (
                    <OptionInput key={i} label={option} noOptions />
                ))}
                <AttachTextArea
                    heading={"Enter solution details"}
                    placeholder={"Question solution"}
                    noAttach
                />
            </HighlightSection>
        </Popup>
    );
}

export default ViewQuestionPopup;
