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
import { useQuery } from "react-query"
import { subjectList } from "../../../api";

function ViewSubjects(props) {
    const { sidebarOptions } = props;

    const handleSubjectClick = () => {};

    const onEdit = () => {
        goto("/reviewer/subject/edit");
    };

    const onRemove = () => {};

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
                        values={["Subject Name"]}
                    />
                </TableHead>
                <TableBody>
                    {data.map((subject, i) => (
                        <TableRow
                            key={i}
                            onClick={handleSubjectClick}
                            values={[
                                subject.name,
                                // TODO: reconsider this
                                /*
                                <ActionOptions
                                    onEdit={onEdit}
                                    onRemove={onRemove}
                                />,
                                */
                            ]}
                        />
                    ))}
                </TableBody>
            </Table>
            <div className="pagination">
                <Button label={"Prev"} icon={<FaArrowLeft />} alt />
                <Button label={"Next"} icon={<FaArrowRight />} alt />
            </div>
        </Page>
    );
}

export default ViewSubjects;
