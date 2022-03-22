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
import { FiFile } from "react-icons/fi";
import ActionOptions from "../../../components/ActionOptions/ActionOptions";
import { useNavigate } from "react-router-dom";

function ViewSubjects(props) {
    const { sidebarOptions } = props;

    const handleTopicClick = () => {};

    const onEdit = () => {
        goto("/reviewer/subject/edit");
    };

    const onRemove = () => {};

    const goto = useNavigate();

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
                    {[0, 0, 0, 0, 0].map((v, i) => (
                        <TableRow
                            key={i}
                            onClick={handleTopicClick}
                            values={[
                                <>
                                    <FiFile />
                                    <span>#17116516</span>
                                </>,
                                "Grammar",
                                <ActionOptions
                                    onEdit={onEdit}
                                    onRemove={onRemove}
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
        </Page>
    );
}

export default ViewSubjects;
