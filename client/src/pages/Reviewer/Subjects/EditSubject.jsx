import React, { useEffect, useState } from "react";
import Page from "../../../components/Page/Page";
import HighlightSection from "../../../components/HighlightSection/HighlightSection";
import Input from "../../../components/Inputs/Input";

import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/Inputs/Button";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { subjectFetch, subjectUpdate } from "../../../api";
import Loading from "../../../components/Loading/Loading";
import SuccessAlert from "../../../components/PopupAlert/SuccessAlert";
import ErrorAlert from "../../../components/PopupAlert/ErrorAlert";

function EditSubject(props) {
    const { sidebarOptions } = props;

    const { subjectId } = useParams();

    const [name, setName] = useState("");

    const {
        data,
        isLoading,
        isSuccess: isQSuccess,
    } = useQuery(["subject", subjectId], () => subjectFetch({ subjectId }));

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
    } = useMutation(subjectUpdate);

    const handleEditSubject = () => {
        if (!data) return;

        send({
            id: data._id,
            name: name,
        });
    };

    if (isReady) {
        return <Loading />;
    }

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={`Edit Subject (#${data?._id})`}
            subHeading={"Edit subject description"}
        >
            <HighlightSection
                heading={"Enter Subject Details"}
                className={"add-ts-container"}
            >
                <Input
                    light={true}
                    placeholder={"Enter Subject Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </HighlightSection>
            <Button
                label={"Edit Subject"}
                icon={<FaArrowRight />}
                full
                alt
                onClick={handleEditSubject}
            />
            {isSuccess && (
                <SuccessAlert
                    heading={"Subject updated"}
                    bottom={"Subject updated successfully"}
                    reset={reset}
                />
            )}
            {isError && (
                <ErrorAlert
                    heading={"Subject updation failed"}
                    bottom={error.toString()}
                    reset={reset}
                />
            )}
        </Page>
    );
}

export default EditSubject;
