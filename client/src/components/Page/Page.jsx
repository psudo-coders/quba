import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import TopBar from "../TopBar/TopBar";

import "./Page.css";

function Page(props) {
    const {
        className,
        sidebarOptions,
        heading,
        subHeading,
        search,
        dropdowns,
    } = props;

    return (
        <div className={`page${className ? " " + className : ""}`}>
            <Sidebar options={sidebarOptions} />
            <div className="page-section">
                <TopBar search={search && search} />
                <div className="page-section-content">
                    <div className="page-section-header">
                        <div className={"page-section-heading"}>
                            {heading && (
                                <h1 className={"heading"}>{heading}</h1>
                            )}

                            {subHeading && (
                                <p className={"sub-heading"}>{subHeading}</p>
                            )}
                        </div>
                        <div className={"dropdowns"}>
                            {dropdowns && dropdowns}
                        </div>
                    </div>

                    {props.children}
                </div>
            </div>
        </div>
    );
}

Page.defaultProps = {
    search: false,
    dropdowns: false,
};

export default Page;
