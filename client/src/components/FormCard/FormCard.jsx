import React from "react";
import FooterLink from "./FooterLink";

import "./FormCard.css";

function FormCard(props) {
    const { heading, footerLinks } = props;

    return (
        <div className={"form-card"}>
            <h1>{heading}</h1>
            <div className="form-card-inputs">{props.children}</div>
            <div className="form-card-footer">
                {footerLinks.map((ftLink) => (
                    <FooterLink {...ftLink} />
                ))}
            </div>
        </div>
    );
}

export default FormCard;
