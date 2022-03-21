import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import PopupAlert from "../../components/PopupAlert/PopupAlert";

function EditQuestionPopup(props) {
    return (
        <PopupAlert
            className={"editing-question"}
            heading={"Editing Question"}
            middle={<BsCheckCircleFill className={"check-circle"} />}
            bottom={"Question edited successfully"}
        />
    );
}

export default EditQuestionPopup;
