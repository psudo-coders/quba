import React, { useState } from "react";
import Page from "../../../components/Page/Page";
import HighlightSection from "../../../components/HighlightSection/HighlightSection";
import Input from "../../../components/Inputs/Input";

import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/Inputs/Button";
import Dropdown from "../../../components/Dropdown/Dropdown";

const data = {
    id: "14651651",
    name: "English",
    topic: "Grammar",
};

function EditTopic(props) {
    const { sidebarOptions } = props;

    const [subject, setSubject] = useState(-1);

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={`Edit Topic (#${data.id})`}
            subHeading={"Edit Topic description"}
        >
            <HighlightSection
                heading={"Enter Topic Details"}
                className={"add-ts-container"}
            >
                <Dropdown
                    name={"Subject"}
                    options={[]}
                    selected={subject}
                    setSelected={setSubject}
                />
                <Input
                    light={true}
                    placeholder={"Enter Topic Name"}
                    value={data.name}
                />
            </HighlightSection>
            <Button label={"Edit Topic"} icon={<FaArrowRight />} full alt />
        </Page>
    );
}

export default EditTopic;
