import React from "react";
import PopupAlert from "../../components/PopupAlert/PopupAlert";
import { BsCheckCircleFill } from "react-icons/bs";
import Button from "../../components/Inputs/Button";
import { FaArrowRight } from "react-icons/fa";

function FreezeQuestionPopup({ complete, duplicates }) {
    const duplicate = (duplicates?.length || 0) > 0;

    return (
        <>
            {!duplicate && (
                <PopupAlert
                    className={"freeze-question"}
                    heading={"Freezing Question"}
                    top={
                        complete
                            ? "Duplicate Checks Complete"
                            : "Running duplicate checks..."
                    }
                    middle={
                        complete ? (
                            <BsCheckCircleFill className={"check-circle"} />
                        ) : (
                            "50%"
                        )
                    }
                    bottom={
                        complete
                            ? "Question freezed successfully"
                            : "Finding plagiarism scores"
                    }
                />
            )}
            {duplicate && (
                <PopupAlert
                    className={"freeze-question"}
                    heading={"Freezing Question"}
                    top={"Found possible duplicates in problem statement"}
                    middle={
                        <>
                            {duplicates.map((duplicate) => (
                                <p>Question ID: #23432</p>
                            ))}
                        </>
                    }
                    bottom={
                        "Check above questions and proceed if its not a duplicate"
                    }
                    footer={
                        <Button
                            alt
                            full
                            label={"Freeze Question"}
                            icon={FaArrowRight}
                        />
                    }
                />
            )}
        </>
    );
}

export default FreezeQuestionPopup;
