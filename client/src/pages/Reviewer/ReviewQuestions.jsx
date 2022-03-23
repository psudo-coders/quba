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
import FreezeQuestionPopup from "./FreezeQuestionPopup";
import RemoveQuestionPopup from "./RemoveQuestionPopup";
import Dropdown from "../../components/Dropdown/Dropdown";
import Loading from "../../components/Loading/Loading";
import ActionOptions from "../../components/ActionOptions/ActionOptions";
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { questionReviewList } from "../../api";

function ReviewQuestions(props) {
    const { sidebarOptions } = props;

    const [freezePopupOpen, setFreezePopupOpen] = useState(false);
    const [removePopupOpen, setRemovePopupOpen] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState(-1);

    const statusOptions = ["Option 1", "Option 2"];

    const goto = useNavigate();

    const onEdit = () => {
        goto("/reviewer/question/edit");
    };

    const onRemove = () => {
        setRemovePopupOpen(true);
    };

    const onFreeze = () => {
        setFreezePopupOpen(true);
    };

    const { data } = useQuery('questionReviewList', () => questionReviewList());
    if (!data) return <Loading />;

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Review Questions"}
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
                        values={["Question ID", "Subject", "Topic", "Action"]}
                    />
                </TableHead>

                <TableBody>
                    {data.map((question, i) => (
                        // FIXME: lets not exploit the tables
                        // TODO(lovesh): UI
                        <>
                            <TableRow
                                key={i}
                                values={[
                                    <>
                                        <FiFile />
                                        <span>{question._id.substr(-8)}</span>
                                    </>,
                                    question.subject,
                                    question.topic,
                                    <ActionOptions
                                        onEdit={onEdit}
                                        onRemove={onRemove}
                                        onFreeze={onFreeze}
                                    />,
                                ]}
                            />

                            <tr>
                                <td colSpan={5}>
                                    <div className="question-description">
                                        <p>Question: {question.statement.text}</p>
                                        {
                                            question.options.map((option, i) => (
                                                <div>
                                                    <span>{i + 1}.</span>
                                                    <span>{option.text}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </td>
                            </tr>
                        </>
                    ))}
                </TableBody>
            </Table>

            {/* TODO: real pagination */}
            <div className="pagination">
                <Button label={"Prev"} icon={<FaArrowLeft />} alt />
                <Button label={"Next"} icon={<FaArrowRight />} alt />
            </div>
            {freezePopupOpen && (
                <FreezeQuestionPopup setOpen={setFreezePopupOpen} />
            )}
            {removePopupOpen && (
                <RemoveQuestionPopup setOpen={setRemovePopupOpen} />
            )}
        </Page>
    );
}

export default ReviewQuestions;
