import React from "react";
import { FaCheck } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";

import "./OptionInput.css";

function OptionInput(props) {
    const { label, noOptions, onClick, selected, ...passingProps } = props;

    return (
        <div className={"option-input-wrapper"}>
            <p>{label}</p>
            <div className="inputs">
                <input
                    type="text"
                    placeholder={"Enter option"}
                    {...passingProps}
                />
                {!noOptions && (
                    <FaCheck
                        onClick={onClick}
                        className={
                            "option-tick" + (selected ? " selected" : "")
                        }
                    />
                )}
                {!noOptions && <ImAttachment className={"option-attach"} />}
            </div>
        </div>
    );
}

OptionInput.defaultProps = {
    selected: false,
};

export default OptionInput;
