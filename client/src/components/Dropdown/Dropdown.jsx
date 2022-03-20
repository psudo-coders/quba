import React, { useState } from "react";

import "./Dropdown.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Dropdown(props) {
    const { name, options, selected, setSelected } = props;

    const [opened, setOpened] = useState(false);

    const toggleDropdown = () => {
        setOpened((prev) => !prev);
    };

    const selectOption = (id) => {
        setSelected(id);
        toggleDropdown();
    };

    return (
        <div className={"dropdown"}>
            <div className={"dropdown-title"} onClick={toggleDropdown}>
                <p className={"dropdown-selected"}>
                    {selected === -1 ? "Select " + name : options[selected]}
                </p>
                <MdOutlineKeyboardArrowDown />
            </div>
            {opened && (
                <div className={"dropdown-options"}>
                    <p onClick={() => selectOption(-1)}>{"Select " + name}</p>
                    {options &&
                        options.map((option, i) => (
                            <p onClick={() => selectOption(i)}>{option}</p>
                        ))}
                </div>
            )}
        </div>
    );
}

Dropdown.defaultProps = {
    options: false,
};

export default Dropdown;
