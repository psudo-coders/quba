import React, { useState } from "react";
import Page from "../../components/Page/Page";
import TableRow from "../../components/Table/TableRow";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableHeadRow from "../../components/Table/TableHeadRow";
import TableBody from "../../components/Table/TableBody";
import { FiFile } from "react-icons/fi";
import SearchBar from "../../components/SearchBar/SearchBar";
import Dropdown from "../../components/Dropdown/Dropdown";
import ViewQuestionPopup from "./ViewQuestionPopup";
import { difficulties, statuses } from "../../config/difficulties";
import useDropdownData from "../../hooks/useDropdownData";
import { subjectList, topicList, questionList } from "../../api";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";

function YourQuestions(props) {
    const { sidebarOptions } = props;

    const [status, setStatus] = useState(-1);
    const [subject, setSubject] = useState(-1);
    const [topic, setTopic] = useState(-1);
    const [topicsData, tIsSuccess] = useDropdownData("topicList", topicList);
    const [subjectsData, sIsSuccess] = useDropdownData(
        "subjectList",
        subjectList
    );

    const [questionPopupOpen, setQuestionPopupOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState({});

    const { data: questions, isSuccess } = useQuery(
        "questionList",
        questionList
    );
    if (!questions) return <Loading />;
    console.log(questions);

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setQuestionPopupOpen(true);
    };

    return (
        <Page
            sidebarOptions={sidebarOptions}
            heading={"Your Questions"}
            subHeading={"Your question description"}
            search={<SearchBar placeholder={"Search Question"} />}
            dropdowns={
                sIsSuccess &&
                tIsSuccess && (
                    <div className={"dropdowns-container"}>
                        <Dropdown
                            name={"Status"}
                            options={statuses}
                            selected={status}
                            setSelected={setStatus}
                        />
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
                        </div>
                    </div>
                )
            }
        >
            <Table>
                <TableHead>
                    <TableHeadRow
                        values={[
                            "Statement",
                            "Difficulty",
                            "Subject",
                            "Topic",
                            "Status",
                        ]}
                    />
                </TableHead>
                <TableBody>
                    {questions.map((question, i) => (
                        <TableRow
                            key={i}
                            onClick={() => handleQuestionClick(question)}
                            values={[
                                <>
                                    <FiFile />
                                    <span>{question.statement.text}</span>
                                </>,
                                difficulties[question.difficulty],
                                question.subject,
                                question.topic,
                                <>
                                    <span
                                        className={
                                            "question-status " + question.status
                                        }
                                    />
                                    <span>
                                        {question.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            question.status.slice(1)}
                                    </span>
                                </>,
                            ]}
                        />
                    ))}
                </TableBody>
            </Table>
            {/* <div className="pagination">
                <Button label={"Prev"} icon={<FaArrowLeft />} alt />
                <Button label={"Next"} icon={<FaArrowRight />} alt />
            </div> */}
            {questionPopupOpen && (
                <ViewQuestionPopup
                    question={selectedQuestion}
                    setOpen={setQuestionPopupOpen}
                />
            )}
        </Page>
    );
}

export default YourQuestions;
