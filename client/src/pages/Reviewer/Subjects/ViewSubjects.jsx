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
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { subjectList, subjectRemove } from "../../../api";
import ActionOptions from "../../../components/ActionOptions/ActionOptions";
import SuccessAlert from "../../../components/PopupAlert/SuccessAlert";
import ErrorAlert from "../../../components/PopupAlert/ErrorAlert";

import { useQueryClient } from "react-query";

function ViewSubjects(props) {
    const { sidebarOptions } = props;

    const handleSubjectClick = () => {};

    const onEdit = (subjectId) => {
        goto("/reviewer/subject/edit/" + subjectId);
    };

    const queryClient = useQueryClient();

    const {
        isError,
        isSuccess,
        reset,
        error,
        mutate: send,
    } = useMutation(subjectRemove);

    const onRemove = (subjectId) => {
        send(
            { id: subjectId },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("subjects");
                },
            }
        );
    };

    const goto = useNavigate();

    const { data, isLoading } = useQuery("subjects", subjectList);
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"View Subjects"}
            subHeading={"View subject description"}
            search={<SearchBar placeholder={"Search Subjects"} />}
            dropdowns={
                <Button
                    label={"Add Subject"}
                    icon={<FaPlus />}
                    onClick={() => goto("/reviewer/subject/create")}
                />
            }
        >
            <Table>
                <TableHead>
                    <TableHeadRow
                        values={["Subject ID", "Subject Name", "Action"]}
                    />
                </TableHead>
                <TableBody>
                    {data.map((subject, i) => (
                        <TableRow
                            key={subject._id}
                            onClick={handleSubjectClick}
                            values={[
                                subject._id,
                                subject.name,
                                <ActionOptions
                                    onEdit={() => onEdit(subject._id)}
                                    onRemove={() => onRemove(subject._id)}
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
                    heading={"Subject removed"}
                    bottom={"Subject removed successfully"}
                    reset={() => {
                        goto("/reviewer/subject/view");
                        reset();
                    }}
                />
            )}
            {isError && (
                <ErrorAlert
                    heading={"Subject removal failed"}
                    bottom={error.toString()}
                    reset={reset}
                />
            )}
        </Page>
    );
}

export default ViewSubjects;
