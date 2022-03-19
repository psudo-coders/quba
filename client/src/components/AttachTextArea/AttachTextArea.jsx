import React from "react";
import { ImAttachment } from "react-icons/im";

import "./AttachTextArea.css";

function AttachTextArea(props) {
    const { heading, placeholder } = props;

    return (
        <div className={"attach-txt-area"}>
            <h2>{heading}</h2>
            <textarea
                cols="30"
                rows="6"
                style={{ resize: "none" }}
                placeholder={placeholder}
            />
            <button className={"attach-quest-imgs"}>
                <ImAttachment />
                Attach images
            </button>
        </div>
    );
}

export default AttachTextArea;
