import React from "react";
import ReactDOM from "react-dom";
import { FaTimesCircle } from "react-icons/fa";

import "./Popup.css";

function Popup(props) {
    const { heading, subheading, onClose, setOpen } = props;

    const handleCloseClick = () => {
        onClose && onClose();
        setOpen && setOpen(false);
    };

    return ReactDOM.createPortal(
        <div className="popup-overlay">
            <div className="popup">
                <div className="popup-header">
                    <div className="popup-headings">
                        {heading && (
                            <div className="popup-heading">{heading}</div>
                        )}
                        {subheading && (
                            <div className="popup-subheading">{subheading}</div>
                        )}
                    </div>
                    {(setOpen || onClose) && (
                        <FaTimesCircle
                            className="popup-close-btn"
                            onClick={handleCloseClick}
                        />
                    )}
                </div>
                <div className="popup-content">{props.children}</div>
                <div className="popup-footer">{props.footer}</div>
            </div>
        </div>,
        document.getElementById("root")
    );
}

export default Popup;
