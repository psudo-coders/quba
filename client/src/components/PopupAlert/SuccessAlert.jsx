import React from "react";
import PopupAlert from "./PopupAlert";
import { FaCheck } from "react-icons/fa";

function SuccessAlert(props) {
    const { heading, bottom, reset } = props;

    return (
        <PopupAlert
            heading={heading}
            middle={<FaCheck className={"check-circle"} />}
            bottom={bottom}
            onClose={() => reset()}
        />
    );
}

export default SuccessAlert;
