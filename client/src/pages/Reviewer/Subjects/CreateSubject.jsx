import React from "react";
import Page from "../../../components/Page/Page";
import HighlightSection from "../../../components/HighlightSection/HighlightSection";
import Input from "../../../components/Inputs/Input";

import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/Inputs/Button";

function CreateSubject(props) {
    const { sidebarOptions } = props;

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Add Subject"}
            subHeading={"Add subject description"}
        >
            <HighlightSection
                heading={"Enter Topic Details"}
                className={"add-ts-container"}
            >
                <Input light={true} placeholder={"Enter Subject Name"} />
            </HighlightSection>
            <Button label={"Create Subject"} icon={<FaArrowRight />} full alt />
        </Page>
    );
}

export default CreateSubject;
