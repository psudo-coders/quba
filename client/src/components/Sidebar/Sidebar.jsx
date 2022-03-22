import React from "react";
import Logo from "../Logo/Logo";
import Button from "../Inputs/Button";
import SidebarOption from "./SidebarOption";

import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar(props) {
    const { options, selected } = props;
    const goto = useNavigate();

    const footerOptions = [
        {
            label: "Profile",
            link: `${options[0]?.link}/profile`,
        },
        {
            label: "Logout",
            link: "",
        },
    ];

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
                            onClick={() => goto(hOption.link)}
                        />
                    ))}
            </div>
            <div className="sidebar-options">
                {options
                    .filter((o) => !o.highlighted)
                    .map((option, i) => (
                        <SidebarOption
                            key={i}
                            label={option.label}
                            isSelected={selected === i}
                            link={option.link}
                        />
                    ))}
            </div>

            <div className="sidebar-options sidebar-footer-opts">
                {footerOptions.map((option, i) => (
                    <SidebarOption
                        key={i}
                        label={option.label}
                        isSelected={selected === i}
                        link={option.link}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
