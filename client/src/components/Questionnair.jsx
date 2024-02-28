import { useState } from "react";
import { questions } from "../utility/questions";

const Questionnaire = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState("");

    const generateQuestions = (questions) => {
        return questions.map(question => question.text);
    };

    const updateCurrentQuestion = (index) => {
        setCurrentQuestion(questionList[index]);
        setCurrentQuestionIndex(index);
    };

    const handleRoute = (answer) => {
        if (answer.toLowerCase() === "yes") {
            console.log("proceed to next page")
        } else if (answer.toLowerCase() === "no") {
            if (currentQuestionIndex < questionList.length - 1) {
                updateCurrentQuestion(currentQuestionIndex + 1);
            } else {
                console.log("End of questions. Handle completion or navigation to next page.");
                setCurrentQuestionIndex(0)
            }
        }
    };

    const questionList = generateQuestions(questions);

    return (
        <div className="questionnaire-container">
            <h2>Eligibility Questionnaire</h2>
            <p>{questionList[currentQuestionIndex]}</p>

            <button onClick={() => handleRoute("yes")}>Yes</button>
            <button onClick={() => handleRoute("no")}>No</button>
        </div>
    );
};

export default Questionnaire;
