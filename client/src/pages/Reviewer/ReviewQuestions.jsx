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
import Loading from "../../components/Loading/Loading";
import ActionOptions from "../../components/ActionOptions/ActionOptions";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { questionRemove, questionReviewList, questionUpdate } from "../../api";
import ViewQuestionPopup from "../Submitter/ViewQuestionPopup";

import { useQueryClient } from "react-query";
import SuccessAlert from "../../components/PopupAlert/SuccessAlert";
import ErrorAlert from "../../components/PopupAlert/ErrorAlert";

function ReviewQuestions(props) {
    const { sidebarOptions } = props;

    const [questionPopupOpen, setQuestionPopupOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState({});

    const queryClient = useQueryClient();

    const goto = useNavigate();

    const onEdit = () => {
        goto("/reviewer/question/edit");
    };

    const removeQuestion = useMutation((id) => questionRemove({ id }), {
        onSuccess: () => {
            queryClient.invalidateQueries("questionReviewList");
        },
    });

    const onRemove = (id) => {
        removeQuestion.mutate(id);
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setQuestionPopupOpen(true);
    };

    const freezeQuestion = useMutation(
        (id) => questionUpdate({ id, status: "freeze" }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("questionReviewList");
            },
        }
    );

    const onFreeze = (id) => {
        freezeQuestion.mutate(id);
    };

    const { data } = useQuery("questionReviewList", questionReviewList);
    if (!data) return <Loading />;

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Review Questions"}
            subHeading={"Your question description"}
            search={<SearchBar placeholder={"Search Question"} />}
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
                                key={question._id}
                                values={[
                                    <>
                                        <FiFile />
                                        <span>{question._id.substr(-8)}</span>
                                    </>,
                                    question.difficulty,
                                    question.subject,
                                    question.topic,
                                    <ActionOptions
                                        onView={() =>
                                            handleQuestionClick(question)
                                        }
                                        onEdit={onEdit}
                                        onRemove={() => onRemove(question._id)}
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

            {removeQuestion.isSuccess && (
                <RemoveQuestionPopup onClose={() => removeQuestion.reset()} />
            )}
            {questionPopupOpen && (
                <ViewQuestionPopup
                    question={selectedQuestion}
                    setOpen={setQuestionPopupOpen}
                />
            )}
            {freezeQuestion.isSuccess && (
                <SuccessAlert
                    heading={"Question freezed"}
                    bottom={"Question freezed successfully"}
                    reset={freezeQuestion.reset}
                />
            )}
            {freezeQuestion.isError && (
                <ErrorAlert
                    heading={"Question freeze failed"}
                    bottom={freezeQuestion.error.toString()}
                    reset={freezeQuestion.reset}
                />
            )}
        </Page>
    );
}

export default ReviewQuestions;
