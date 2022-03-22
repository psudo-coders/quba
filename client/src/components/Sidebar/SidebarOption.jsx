import React from "react";
import { useNavigate } from "react-router-dom";

function SidebarOption(props) {
    const { label, isSelected, link } = props;
    const goto = useNavigate();

    return <p className={`${isSelected ? "selected" : ""}`} onClick={() => goto(link)}>{label}</p>;
}

export default SidebarOption;
