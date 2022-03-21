import React from "react";
import ReactDOM from "react-dom";
import { FaTimesCircle } from "react-icons/fa";

import "./Popup.css";

function Popup(props) {
    const { className, heading, subheading, onClose, setOpen } = props;

    const handleCloseClick = () => {
        onClose && onClose();
        setOpen && setOpen(false);
    };

    return ReactDOM.createPortal(
        <div className={`popup-overlay${className ? " " + className : ""}`}>
            <div className="popup">
                <div className="popup-header">
                    <div className="popup-headings">
                        {heading && <p className="popup-heading">{heading}</p>}
                        {subheading && (
                            <p className="popup-subheading">{subheading}</p>
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
