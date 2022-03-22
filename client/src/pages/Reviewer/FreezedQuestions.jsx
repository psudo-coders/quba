import React, { useState } from "react";
import Page from "../../components/Page/Page";
import Button from "../../components/Inputs/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SearchBar from "../../components/SearchBar/SearchBar";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableHeadRow from "../../components/Table/TableHeadRow";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import { FiFile } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import RemoveQuestionPopup from "./RemoveQuestionPopup";
import Dropdown from "../../components/Dropdown/Dropdown";

function FreezedQuestions(props) {
    const { sidebarOptions } = props;

    const [popupOpen, setPopupOpen] = useState(false);

    const [status, setStatus] = useState(-1);
    const [subject, setSubject] = useState(-1);
    const [difficulty, setDifficulty] = useState(-1);

    const handleQuestionClick = () => {
        setPopupOpen(true);
    };

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"View Freezed Questions"}
            subHeading={"Your question description"}
            search={<SearchBar placeholder={"Search Question"} />}
            dropdowns={
                <div className={"dropdowns-container"}>
                    <Dropdown
                        name={"Status"}
                        options={[]}
                        selected={status}
                        setSelected={setStatus}
                    />
                    <Dropdown
                        name={"Status"}
                        options={[]}
                        selected={subject}
                        setSelected={setSubject}
                    />
                    <Dropdown
                        name={"Status"}
                        options={[]}
                        selected={difficulty}
                        setSelected={setDifficulty}
                    />
                </div>
            }
        >
            <Table>
                <TableHead>
                    <TableHeadRow
                        values={["Question ID", "Subject", "Topic", "Action"]}
                    />
                </TableHead>
                <TableBody>
                    {[0, 0, 0, 0, 0].map((v, i) => (
                        <TableRow
                            key={i}
                            onClick={handleQuestionClick}
                            values={[
                                <>
                                    <FiFile />
                                    <span>#17145651</span>
                                </>,
                                "English",
                                "Grammar",
                                <BsThreeDots />,
                            ]}
                        />
                    ))}
                </TableBody>
            </Table>
            <div className="pagination">
                <Button label={"Prev"} icon={<FaArrowLeft />} alt />
                <Button label={"Next"} icon={<FaArrowRight />} alt />
            </div>
            {popupOpen && (
                <RemoveQuestionPopup setOpen={setPopupOpen} complete />
            )}
        </Page>
    );
}

export default FreezedQuestions;
