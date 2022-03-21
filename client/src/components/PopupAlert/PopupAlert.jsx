import React from "react";
import Popup from "../Popup/Popup";

import "./PopupAlert.css";

function PopupAlert({
    className,
    heading,
    top,
    middle,
    bottom,
    footer,
    setOpen,
}) {
    return (
        <Popup setOpen={setOpen} heading={heading} className={className}>
            <div className={"popup-alert-content"}>
                <h1>{top}</h1>
                <p>{middle}</p>
                <h6>{bottom}</h6>
                {footer}
            </div>
        </Popup>
    );
}

export default PopupAlert;
