import "./QuestionPaper.css"
import Loading from "../../components/Loading/Loading"
import { useQuery } from "react-query"
import { testGenerate } from "../../api"

// TODO: parameterize
export default function QuestionPaper() {
    const { data, isLoading } = useQuery("testGenerate", _ => testGenerate(), {
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
    if (isLoading) {
        return <Loading />
    }
    return (
        // TODO: handle answer sheet printing?
        // TODO: images
        <div className="question-paper">
            <div className="question-paper-headr">
                <h1>Question Paper</h1>
            </div>
            <div className="question-paper-body">
                {data.map((question, index) => (
                    <div className="question" key={index}>
                        <div className="question-header">
                            {index + 1}. {question.statement.text}
                        </div>
                        <div className="options">
                            {question.options.map((option, index) => (
                                <div className="option" key={index}>
                                    {String.fromCharCode(index + 65)}. {option.text}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
