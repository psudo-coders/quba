import React from "react";
import CheckboxOption from "./CheckboxOption";

import "./CheckboxOptions.css";

function CheckboxOptions(props) {
    const { options, label, selectedIdxs, onOptionClick } = props;

    const handleOptionClick = (i) => {
        onOptionClick(i);
    };

    console.log(selectedIdxs);

    return (
        <div className={"checkbox-options"}>
            <h1>{label}</h1>
            {options.map((o, i) => (
                <CheckboxOption
                    key={i}
                    id={i}
                    {...o}
                    selected={selectedIdxs.includes(i)}
                    onClick={handleOptionClick}
                />
            ))}
        </div>
    );
}

export default CheckboxOptions;
