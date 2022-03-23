import React from "react";
import { useNavigate } from "react-router-dom";

function SidebarOption(props) {
    let { label, isSelected, link, onClick } = props;
    const goto = useNavigate();
    if (!onClick) onClick = () => goto(link);

    return <p className={`${isSelected ? "selected" : ""}`} onClick={onClick}>{label}</p>;
}

export default SidebarOption;
