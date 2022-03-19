import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import TopBar from "../TopBar/TopBar";

import "./Page.css";

function Page(props) {
    const { sidebarOptions, heading, subHeading } = props;

    return (
        <div className={"page"}>
            <Sidebar options={sidebarOptions} />
            <div className="page-section">
                <TopBar />
                <div className="page-section-content">
                    <div className="page-section-header">
                        {heading && <h1 className={"heading"}>{heading}</h1>}
                        {subHeading && (
                            <p className={"sub-heading"}>{subHeading}</p>
                        )}
                    </div>

                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Page;
