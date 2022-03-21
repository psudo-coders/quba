import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import PopupAlert from "../../components/PopupAlert/PopupAlert";

function GenerateQuestionPaperPopup({ complete }) {
    return (
        <PopupAlert
            className={"gen-question-paper"}
            heading={"Generating Question Papers"}
            middle={
                complete ? (
                    <BsCheckCircleFill className={"check-circle"} />
                ) : (
                    "50%"
                )
            }
            bottom={
                complete
                    ? "Question papers generated successfully"
                    : "Generating 1 set out of 5"
            }
        />
    );
}

export default GenerateQuestionPaperPopup;
