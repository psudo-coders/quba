import React from "react";
import CheckboxOption from "./CheckboxOption";

import "./CheckboxOptions.css";

function CheckboxOptions(props) {
    const { options, label, selectedIdx, onOptionClick } = props;

    const handleOptionClick = (i) => {
        onOptionClick(i);
    };

    return (
        <div className={"checkbox-options"}>
            <h1>{label}</h1>
            {options.map((o, i) => (
                <CheckboxOption
                    key={i}
                    id={i}
                    {...o}
                    selected={i === selectedIdx}
                    onClick={handleOptionClick}
                />
            ))}
        </div>
    );
}

export default CheckboxOptions;
