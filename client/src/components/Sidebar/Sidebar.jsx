import React from "react";
import Logo from "../Logo/Logo";
import Button from "../Inputs/Button";
import SidebarOption from "./SidebarOption";

import "./Sidebar.css";

const footerOptions = [
    {
        label: "Profile",
        link: "",
    },
    {
        label: "Logout",
        link: "",
    },
];

function Sidebar(props) {
    const { options, selected } = props;

    return (
        <div className={"sidebar"}>
            <Logo alt />
            <div className="highlighted-btns">
                {options
                    .filter((o) => o.highlighted)
                    .map((hOption, i) => (
                        <Button
                            key={i}
                            label={hOption.label}
                            icon={hOption.icon}
                        />
                    ))}
            </div>
            <div className="sidebar-options">
                {options.map((option, i) => (
                    <SidebarOption
                        key={i}
                        label={option.label}
                        isSelected={selected === i}
                    />
                ))}
            </div>

            <div className="sidebar-options sidebar-footer-opts">
                {footerOptions.map((option, i) => (
                    <SidebarOption
                        key={i}
                        label={option.label}
                        isSelected={selected === i}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
