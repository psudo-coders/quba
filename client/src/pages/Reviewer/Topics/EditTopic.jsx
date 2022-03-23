import React, { useEffect, useState } from "react";
import Page from "../../../components/Page/Page";
import HighlightSection from "../../../components/HighlightSection/HighlightSection";
import Input from "../../../components/Inputs/Input";

import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/Inputs/Button";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { subjectList, topicFetch, topicUpdate } from "../../../api";
import Loading from "../../../components/Loading/Loading";
import SuccessAlert from "../../../components/PopupAlert/SuccessAlert";
import ErrorAlert from "../../../components/PopupAlert/ErrorAlert";

function EditTopic(props) {
    const { sidebarOptions } = props;

    const { topicId } = useParams();

    const [subject, setSubject] = useState(-1);
    const [name, setName] = useState("");

    let { data: subjects } = useQuery("subjects", subjectList);
    subjects = subjects || [];

    const {
        data,
        isLoading,
        isSuccess: isQSuccess,
    } = useQuery(["topic", topicId], () => topicFetch({ topicId }));

    useEffect(() => {
        if (!data) return;

        setSubject(subjects.findIndex((s) => s._id === data?.subject));
    }, [subjects, data?.subject]);

    useEffect(() => {
        if (data?.name) setName(data?.name);
    }, [data?.name]);

    const isReady = isLoading && isQSuccess;

    const {
        isError,
        isSuccess,
        reset,
        error,
        mutate: send,
    } = useMutation(topicUpdate);

    const handleEditTopic = () => {
        if (!data) return;

        const subjectId = subjects?.[subject]?._id || -1;
        if (subjectId === -1) return;

        send({
            id: data._id,
            name: name,
            subject: subjectId,
        });
    };

    if (isReady) {
        return <Loading />;
    }

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={`Edit Topic (#${data?._id})`}
            subHeading={"Edit Topic description"}
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
                label={"Edit Topic"}
                icon={<FaArrowRight />}
                full
                alt
                onClick={handleEditTopic}
            />
            {isSuccess && (
                <SuccessAlert
                    heading={"Topic updated"}
                    bottom={"Topic updated successfully"}
                    reset={reset}
                />
            )}
            {isError && (
                <ErrorAlert
                    heading={"Topic updation failed"}
                    bottom={error.toString()}
                    reset={reset}
                />
            )}
        </Page>
    );
}

export default EditTopic;
