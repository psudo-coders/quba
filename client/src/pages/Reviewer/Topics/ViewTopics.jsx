import React from "react";
import Button from "../../../components/Inputs/Button";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import Page from "../../../components/Page/Page";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Table from "../../../components/Table/Table";
import TableHead from "../../../components/Table/TableHead";
import TableHeadRow from "../../../components/Table/TableHeadRow";
import TableBody from "../../../components/Table/TableBody";
import TableRow from "../../../components/Table/TableRow";
import ActionOptions from "../../../components/ActionOptions/ActionOptions";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { topicRemove, topicList } from "../../../api";
import Loading from "../../../components/Loading/Loading";

import { useQueryClient } from "react-query";
import SuccessAlert from "../../../components/PopupAlert/SuccessAlert";
import ErrorAlert from "../../../components/PopupAlert/ErrorAlert";

function ViewTopics(props) {
    const { sidebarOptions } = props;

    const handleTopicClick = () => {};

    const queryClient = useQueryClient();

    const onEdit = (topicId) => {
        goto("/reviewer/topic/edit/" + topicId);
    };

    const {
        isError,
        isSuccess,
        reset,
        error,
        mutate: send,
    } = useMutation(topicRemove);

    const onRemove = (topicId) => {
        send(
            { id: topicId },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("topics");
                },
            }
        );
    };

    const goto = useNavigate();

    const { data, isLoading } = useQuery("topics", topicList);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"View Topics"}
            subHeading={"View topic description"}
            search={<SearchBar placeholder={"Search Topics"} />}
            dropdowns={
                <Button
                    label={"Add Topic"}
                    icon={<FaPlus />}
                    onClick={() => goto("/reviewer/topic/create")}
                />
            }
        >
            <Table>
                <TableHead>
                    <TableHeadRow
                        values={["TopicID", "Topic Name", "Subject", "Action"]}
                    />
                </TableHead>
                <TableBody>
                    {data.map((topic, i) => (
                        <TableRow
                            key={topic._id}
                            onClick={handleTopicClick}
                            values={[
                                topic._id,
                                topic.name,
                                topic.subject,
                                <ActionOptions
                                    onEdit={() => onEdit(topic._id)}
                                    onRemove={() => onRemove(topic._id)}
                                />,
                            ]}
                        />
                    ))}
                </TableBody>
            </Table>
            <div className="pagination">
                <Button label={"Prev"} icon={<FaArrowLeft />} alt />
                <Button label={"Next"} icon={<FaArrowRight />} alt />
            </div>
            {isSuccess && (
                <SuccessAlert
                    heading={"Topic removed"}
                    bottom={"Topic removed successfully"}
                    reset={() => {
                        goto("/reviewer/topic/view");
                        reset();
                    }}
                />
            )}
            {isError && (
                <ErrorAlert
                    heading={"Topic removal failed"}
                    bottom={error.toString()}
                    reset={reset}
                />
            )}
        </Page>
    );
}

export default ViewTopics;