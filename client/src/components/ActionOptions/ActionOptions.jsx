import React, { useState } from "react";

import "./ActionOptions.css";
import { BsNodePlusFill, BsThreeDots } from "react-icons/bs";
import { AiFillEdit, AiFillMinusCircle } from "react-icons/ai";

function ActionOptions(props) {
    const { onEdit, onFreeze, onRemove } = props;

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className={"action-options-container"}>
            <BsThreeDots onClick={toggle} />
            {open && (
                <div className={"action-options"}>
                    {onEdit && (
                        <div className={"action"} onClick={onEdit}>
                            <AiFillEdit color={"blue"} size={20} /> Edit
                        </div>
                    )}
                    {onFreeze && (
                        <div className={"action"} onClick={onFreeze}>
                            <BsNodePlusFill color={"green"} size={20} /> Freeze
                        </div>
                    )}
                    {onRemove && (
                        <div className={"action"} onClick={onRemove}>
                            <AiFillMinusCircle color={"red"} size={20} /> Remove
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

ActionOptions.defaultProps = {
    edit: false,
    freeze: false,
    remove: false,
};

export default ActionOptions;
