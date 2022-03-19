import React from "react";

function SidebarOption(props) {
    const { label, isSelected } = props;

    return <p className={`${isSelected ? "selected" : ""}`}>{label}</p>;
}

export default SidebarOption;
