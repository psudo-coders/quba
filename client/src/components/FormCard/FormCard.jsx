import React from "react";
import FooterLink from "./FooterLink";

import "./FormCard.css";

function FormCard(props) {
    const { heading, footerLinks, isError } = props;

    return (
        <form className={"form-card"} {...props}>
            {isError && <p className="error">Invalid Email/Password</p> }
            <h1>{heading}</h1>
            <div className="form-card-inputs">{props.children}</div>
            <div className="form-card-footer">
                {footerLinks.map((ftLink, i) => (
                    <FooterLink key={i} {...ftLink} />
                ))}
            </div>
        </form>
    );
}

export default FormCard;
