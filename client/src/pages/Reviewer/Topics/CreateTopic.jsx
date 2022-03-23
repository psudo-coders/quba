import React, { useState } from "react";
import Page from "../../../components/Page/Page";
import HighlightSection from "../../../components/HighlightSection/HighlightSection";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Input from "../../../components/Inputs/Input";

import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/Inputs/Button";
import { useMutation, useQuery } from "react-query";
import { subjectList, topicCreate } from "../../../api";
import SuccessAlert from "../../../components/PopupAlert/SuccessAlert";
import ErrorAlert from "../../../components/PopupAlert/ErrorAlert";

function CreateTopic(props) {
    const { sidebarOptions } = props;

    let { data: subjects } = useQuery("subjects", subjectList);
    subjects = subjects || [];

    const [name, setName] = useState("");

    const {
        isError,
        isSuccess,
        error,
        reset,
        mutate: send,
    } = useMutation(topicCreate, {
        onSuccess: () => {
            setName("");
        },
    });

    const [subject, setSubject] = useState(-1);

    const handleCreateTopic = () => {
        const subjectId = subjects?.[subject]?._id || -1;

        send({
            name,
            subject: subjectId,
        });
    };

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
                    options={subjects.map((subject) => subject.name)}
                    selected={subject}
                    setSelected={setSubject}
                />
                <Input
                    light={true}
                    placeholder={"Enter Topic Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </HighlightSection>
            <Button
                label={"Create Topic"}
                icon={<FaArrowRight />}
                full
                alt
                onClick={handleCreateTopic}
            />
            {isSuccess && (
                <SuccessAlert
                    heading={"Topic created"}
                    bottom={"Topic created successfully"}
                    reset={reset}
                />
            )}
            {isError && (
                <ErrorAlert
                    heading={"Topic creation failed"}
                    bottom={"Invalid subject"}
                    reset={reset}
                />
            )}
        </Page>
    );
}

export default CreateTopic;
