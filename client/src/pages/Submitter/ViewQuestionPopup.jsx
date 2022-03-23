import React from "react";
import Popup from "../../components/Popup/Popup";
import AttachTextArea from "../../components/AttachTextArea/AttachTextArea";
import OptionInput from "../../components/OptionInputs/OptionInput";
import HighlightSection from "../../components/HighlightSection/HighlightSection";

import "./YourQuestionPopup.css";
import HightlightDisplay from "../../components/HighlightDisplay/HightlightDisplay";
import { difficulties } from "../../config/difficulties";

function ViewQuestionPopup({ question, setOpen }) {
    return (
        <Popup
            setOpen={setOpen}
            heading={`View Question(#${question._id.substr(-8)})`}
        >
            <HighlightSection className={"view-question"}>
                <div className={"question-options"}>
                    <HightlightDisplay name={question.subject} />
                    <HightlightDisplay name={question.topic} />
                    <HightlightDisplay
                        name={difficulties[question.difficulty] || "Easy"}
                    />
                </div>
                <AttachTextArea
                    placeholder={"Question statement"}
                    value={question.statement.text}
                    noAttach
                />
                {question.options.map((option, i) => (
                    <OptionInput
                        key={i}
                        label={String.fromCharCode(65 + i)}
                        noOptions
                        value={option.text}
                    />
                ))}
                <p className="blue-text">
                    Correct Answer:
                    {" " + String.fromCharCode(65 + question.correctAnswer)}
                </p>
                <AttachTextArea
                    heading={"Enter solution details"}
                    placeholder={"Question solution"}
                    value={question.solution.text}
                    noAttach
                />
            </HighlightSection>
        </Popup>
    );
}

export default ViewQuestionPopup;
