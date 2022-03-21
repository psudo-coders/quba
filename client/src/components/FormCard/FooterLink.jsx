import React from "react";
import { useNavigate } from "react-router-dom";

function FooterLink({ label, link }) {
    const goto = useNavigate();
    return <p className={"footer-link"} onClick={() => goto(link)}>{label}</p>;
}

export default FooterLink;
