import React, { useState } from "react";
import Page from "../../../components/Page/Page";
import HighlightSection from "../../../components/HighlightSection/HighlightSection";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Input from "../../../components/Inputs/Input";

import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/Inputs/Button";

function CreateTopic(props) {
    const { sidebarOptions } = props;

    const [subject, setSubject] = useState(-1);

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Add Topic"}
            subHeading={"Add topic description"}
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
                <Input light={true} placeholder={"Enter Topic Name"} />
            </HighlightSection>
            <Button label={"Create Topic"} icon={<FaArrowRight />} full alt />
        </Page>
    );
}

export default CreateTopic;
