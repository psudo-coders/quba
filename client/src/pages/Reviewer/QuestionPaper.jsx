import "./QuestionPaper.css";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "react-query";
import { testGenerate } from "../../api";
import Logo from "../../components/Logo/Logo";

// TODO: parameterize
export default function QuestionPaper() {
    const { data, isLoading } = useQuery(
        "testGenerate",
        (_) => testGenerate(),
        {
            refetchOnMount: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );
    if (isLoading) {
        return <Loading />;
    }
    return (
        // TODO: handle answer sheet printing?
        // TODO: images
        <div className="question-paper-container">
            <div className="question-paper-header">
                <Logo alt />
            </div>
            <div className="question-paper">
                <div className="question-paper-body">
                    {data.map((question, index) => (
                        <div className="question" key={index}>
                            <p className="question-no">Question {index + 1}</p>
                            <p className="question-statement">
                                {question.statement.text}
                            </p>
                            <div className="options">
                                {question.options.map((option, index) => (
                                    <div className="option">
                                        <span className="option-detail">
                                            {String.fromCharCode(index + 65)}.
                                        </span>
                                        <p>{option.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
