import React from "react";
import { FaTimes } from "react-icons/fa";
import PopupAlert from "./PopupAlert";

function ErrorAlert(props) {
    const { heading, bottom, reset } = props;

    return (
        <PopupAlert
            heading={heading}
            middle={<FaTimes className={"error-circle"} />}
            bottom={bottom}
            onClose={reset}
        />
    );
}

export default ErrorAlert;
