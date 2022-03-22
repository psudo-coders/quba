import React, { useState } from "react";
import Page from "../../../components/Page/Page";
import HighlightSection from "../../../components/HighlightSection/HighlightSection";
import Input from "../../../components/Inputs/Input";
import { useMutation } from "react-query"
import { subjectCreate } from "../../../api";

import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/Inputs/Button";

function CreateSubject(props) {
    const { sidebarOptions } = props;
    const [name, setName] = useState("");
    const { isError, mutate: send } = useMutation(subjectCreate, {
        onSuccess: () => {
            setName("");
            // TODO: show success to the user
            console.log("success");
        },
    });

    return (
        // TODO: handle errors
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Add Subject"}
            subHeading={"Add subject description"}
        >
            <HighlightSection
                heading={"Enter Topic Details"}
                className={"add-ts-container"}
            >
                <Input light={true} placeholder={"Enter Subject Name"} value={name} onChange={ev => setName(ev.target.value)} />
            </HighlightSection>
            <Button label={"Create Subject"} icon={<FaArrowRight />} full alt
                onClick={() => send({ name })} />
        </Page>
    );
}

export default CreateSubject;
