import React, { useState } from "react";
import Page from "../../components/Page/Page";
import TableRow from "../../components/Table/TableRow";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableHeadRow from "../../components/Table/TableHeadRow";
import TableBody from "../../components/Table/TableBody";
import { FiFile } from "react-icons/fi";
import Button from "../../components/Inputs/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SearchBar from "../../components/SearchBar/SearchBar";
import Dropdown from "../../components/Dropdown/Dropdown";

function YourQuestions(props) {
    const { sidebarOptions } = props;

    const [selectedStatus, setSelectedStatus] = useState(-1);

    const statusOptions = ["Option 1", "Option 2"];

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Your Questions"}
            subHeading={"Your question description"}
            search={<SearchBar placeholder={"Search Question"} />}
            dropdowns={
                <Dropdown
                    name={"Status"}
                    options={statusOptions}
                    selected={selectedStatus}
                    setSelected={setSelectedStatus}
                />
            }
        >
            <Table>
                <TableHead>
                    <TableHeadRow
                        values={["Statement", "Subject", "Topic", "Status"]}
                    />
                </TableHead>
                <TableBody>
                    {[0, 0, 0, 0, 0].map(() => (
                        <TableRow
                            values={[
                                <>
                                    <FiFile />
                                    <span>
                                        Problem statement adsklaksd asd
                                        asdasfsdsfdsf
                                    </span>
                                </>,
                                "English",
                                "Grammar",
                                <>
                                    <span className={"question-status"} />
                                    <span>Approved</span>
                                </>,
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

export default YourQuestions;
