import React from "react";
import { FaCheck } from "react-icons/fa";

function CheckboxOption(props) {
    const { id, selected, label, onClick } = props;

    return (
        <div className={"checkbox-option"} onClick={() => onClick(id)}>
            <div className="selected-box">{selected && <FaCheck />}</div>
            <p>{label}</p>
        </div>
    );
}

export default CheckboxOption;
