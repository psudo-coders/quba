import React from "react";
import { FaCheck } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";

import "./OptionInput.css";

function OptionInput(props) {
    const { label } = props;

    return (
        <div className={"option-input-wrapper"}>
            <p>{label}</p>
            <div className="inputs">
                <input type="text" placeholder={"Enter question statement"} />
                <FaCheck className={"option-tick"} />
                <ImAttachment className={"option-attach"} />
            </div>
        </div>
    );
}

export default OptionInput;
