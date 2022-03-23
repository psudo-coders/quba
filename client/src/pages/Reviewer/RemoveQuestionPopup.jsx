import React from "react";
import PopupAlert from "../../components/PopupAlert/PopupAlert";
import { FaEraser } from "react-icons/fa";

function RemoveQuestionPopup({ onClose }) {
    return (
        <PopupAlert
            className={"remove-question"}
            heading={"Removing Question"}
            middle={<FaEraser className={"eraser"} />}
            bottom={"Question set to be removed, will be removed in 7 days"}
            onClose={onClose}
        />
    );
}

export default RemoveQuestionPopup;
