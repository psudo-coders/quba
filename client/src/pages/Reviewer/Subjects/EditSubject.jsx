import React from "react";
import Page from "../../../components/Page/Page";
import HighlightSection from "../../../components/HighlightSection/HighlightSection";
import Input from "../../../components/Inputs/Input";

import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/Inputs/Button";

const data = {
    id: "14651651",
    name: "English",
};

function EditSubject(props) {
    const { sidebarOptions } = props;

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={`Edit Subject (#${data.id})`}
            subHeading={"Edit subject description"}
        >
            <HighlightSection
                heading={"Enter Subject Details"}
                className={"add-ts-container"}
            >
                <Input
                    light={true}
                    placeholder={"Enter Subject Name"}
                    value={data.name}
                />
            </HighlightSection>
            <Button label={"Edit Subject"} icon={<FaArrowRight />} full alt />
        </Page>
    );
}

export default EditSubject;
