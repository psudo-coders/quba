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
import RemoveQuestionPopup from "./RemoveQuestionPopup";
import Dropdown from "../../components/Dropdown/Dropdown";
import Loading from "../../components/Loading/Loading";
import ActionOptions from "../../components/ActionOptions/ActionOptions";
import { useNavigate } from "react-router-dom";
import useDropdownData from "../../hooks/useDropdownData";
import { subjectList, topicList } from "../../api";
import { difficulties } from "../../config/difficulties";
import { useQuery } from "react-query"
import { questionFrozen } from '../../api'

function FreezedQuestions(props) {
    const { sidebarOptions } = props;

    const [difficulty, setDifficulty] = useState(-1);
    const [subject, setSubject] = useState(-1);
    const [topic, setTopic] = useState(-1);

    const [topicsData, tIsSuccess] = useDropdownData("topicList", topicList);
    const [subjectsData, sIsSuccess] = useDropdownData(
        "subjectList",
        subjectList
    );

    const [removePopupOpen, setRemovePopupOpen] = useState(false);
    const {data, isLoading} = useQuery("questionFrozen", questionFrozen);

    const goto = useNavigate();

    const onEdit = () => {
        goto("/reviewer/question/edit");
    };

    const onRemove = () => {
        setRemovePopupOpen(true);
    };

    if(isLoading) return <Loading />

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"View Freezed Questions"}
            subHeading={"Your question description"}
            search={<SearchBar placeholder={"Search Question"} />}
            dropdowns={
                sIsSuccess &&
                tIsSuccess && (
                    <div className={"dropdowns-container"}>
                        <Dropdown
                            name={"Subject"}
                            options={subjectsData.map(
                                (subject) => subject.name
                            )}
                            selected={subject}
                            setSelected={setSubject}
                        />
                        <Dropdown
                            name={"Topic"}
                            options={topicsData.map((topic) => topic.name)}
                            selected={topic}
                            setSelected={setTopic}
                        />
                        <Dropdown
                            name={"Difficulty"}
                            options={difficulties}
                            selected={difficulty}
                            setSelected={setDifficulty}
                        />
                    </div>
                )
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
                                />,
                            ]}
                        />
                    ))}
                </TableBody>
            </Table>
            {/* <div className="pagination">
                <Button label={"Prev"} icon={<FaArrowLeft />} alt />
                <Button label={"Next"} icon={<FaArrowRight />} alt />
            </div> */}
            {removePopupOpen && (
                <RemoveQuestionPopup setOpen={setRemovePopupOpen} />
            )}
        </Page>
    );
}

export default FreezedQuestions;
