import { useState } from "react";
import { Link } from "react-router-dom";
import { questions } from "../utility/questions";

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [path, setPath] = useState("");

  const generateQuestions = (questions) => {
    return questions.map((question) => question.text);
  };

  const updateCurrentQuestion = (index) => {
    // setCurrentQuestion(questionList[index]);
    setCurrentQuestionIndex(index);
  };

  const handleRoute = (answer) => {
    let path;
    if (answer.toLowerCase() === "yes") {
      path = "/forms";
      alert("Congragulations you are eligible for our tax services");
    } else if (answer.toLowerCase() === "no") {
      if (currentQuestionIndex < questionList.length - 1) {
        updateCurrentQuestion(currentQuestionIndex + 1);
      } else {
        path = "/";
        alert(
          "You have reached the end of the questionnair and are not eligible for our services. Feel free to take it again."
        );
      }
    }
    setPath(path);
  };

  const questionList = generateQuestions(questions);

  return (
    <div className="questionnaire-container">
      <h2>Eligibility Questionnaire</h2>
      <p>{questionList[currentQuestionIndex]}</p>
      <div>
        <button onClick={() => handleRoute("yes")}>Yes</button>

        <button onClick={() => handleRoute("no")}>No</button>
      </div>
      {path === "/forms" ? (
        <Link to={path}>
          <button>Next</button>
        </Link>
      ) : (
        path === "/" && (
          <Link to={path}>
            <button>Go back</button>
          </Link>
        )
      )}
    </div>
  );
};

export default Questionnaire;
