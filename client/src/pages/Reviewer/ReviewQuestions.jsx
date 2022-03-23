import React, { useState } from "react";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableHeadRow from "../../components/Table/TableHeadRow";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import { FiFile } from "react-icons/fi";
import RemoveQuestionPopup from "./RemoveQuestionPopup";
import Dropdown from "../../components/Dropdown/Dropdown";
import Loading from "../../components/Loading/Loading";
import ActionOptions from "../../components/ActionOptions/ActionOptions";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { questionReviewList, questionUpdate } from "../../api";
import ViewQuestionPopup from "../Submitter/ViewQuestionPopup";

function ReviewQuestions(props) {
    const { sidebarOptions } = props;

    const [removePopupOpen, setRemovePopupOpen] = useState(false);
    const [questionPopupOpen, setQuestionPopupOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState({});

    const [selectedStatus, setSelectedStatus] = useState(-1);

    const statusOptions = ["Option 1", "Option 2"];

    const goto = useNavigate();

    const onEdit = () => {
        goto("/reviewer/question/edit");
    };

    const onRemove = () => {
        setRemovePopupOpen(true);
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setQuestionPopupOpen(true);
    };

    const { mutate: freezeQuestion } = useMutation(
        (id) => questionUpdate({ id, status: "freeze" }),
        {
            onSuccess: () => {
                console.log("success freeze");
            },
        }
    );

    const onFreeze = (id) => {
        console.log("freeze");
        freezeQuestion(id);
        window.location.reload();
    };

    const { data } = useQuery("questionReviewList", questionReviewList);
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
                        values={[
                            "Question ID",
                            "Difficulty",
                            "Subject",
                            "Topic",
                            "Action",
                        ]}
                    />
                </TableHead>

                <TableBody>
                    {data.map((question, i) => (
                        // FIXME: lets not exploit the tables
                        // TODO(lovesh): UI
                        <>
                            <TableRow
                                key={i}
                                onClick={() => handleQuestionClick(question)}
                                values={[
                                    <>
                                        <FiFile />
                                        <span>{question._id.substr(-8)}</span>
                                    </>,
                                    question.difficulty,
                                    question.subject,
                                    question.topic,
                                    <ActionOptions
                                        onEdit={onEdit}
                                        onRemove={onRemove}
                                        onFreeze={() => onFreeze(question._id)}
                                    />,
                                ]}
                            />

                            {/*<tr>*/}
                            {/*    <td colSpan={5}>*/}
                            {/*        <div className="question-description">*/}
                            {/*            <p>*/}
                            {/*                Question: {question.statement.text}*/}
                            {/*            </p>*/}
                            {/*            {question.options.map((option, i) => (*/}
                            {/*                <div>*/}
                            {/*                    <span>{i + 1}.</span>*/}
                            {/*                    <span>{option.text}</span>*/}
                            {/*                </div>*/}
                            {/*            ))}*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                        </>
                    ))}
                </TableBody>
            </Table>

            {removePopupOpen && (
                <RemoveQuestionPopup setOpen={setRemovePopupOpen} />
            )}
            {questionPopupOpen && (
                <ViewQuestionPopup
                    question={selectedQuestion}
                    setOpen={setQuestionPopupOpen}
                />
            )}
        </Page>
    );
}

export default ReviewQuestions;
