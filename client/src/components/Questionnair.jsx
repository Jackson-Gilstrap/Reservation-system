import { useState } from "react";
import { Link } from "react-router-dom";
import { questions } from "../utility/questions";

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [path, setPath] = useState("");
  const [disableoptions, setDisabledOptions] = useState(false);
  const [isEligible, setisEligible] = useState(false);

  const generateQuestions = (questions) => {
    return questions.map((question) => question.text);
  };

  const updateCurrentQuestion = (index) => {
    // setCurrentQuestion(questionList[index]);
    setCurrentQuestionIndex(index);
  };

  const handleRoute = (answer) => {
    let newPath;
    if (answer.toLowerCase() === "yes") {
      newPath = "/reservation";
      alert("Congragulations you are eligible for our tax services");
      setisEligible(true);
      setDisabledOptions(true)
    } else if (answer.toLowerCase() === "no") {
      if (currentQuestionIndex < questionList.length - 1) {
        updateCurrentQuestion(currentQuestionIndex + 1);
      } else {
        setDisabledOptions(true);
        newPath = "/";
        alert(
          "You have reached the end of the questionnair and are not eligible for our services. Feel free to take it again."
        );
      }
    }
    setPath(newPath);
  };

  const questionList = generateQuestions(questions);

  return (
    <>
      <Link to={"/intake"}>
        <button>Go Back</button>
      </Link>

      <div className="questionnaire-container">
        <h2>Eligibility Questionnaire</h2>
        <p>{questionList[currentQuestionIndex]}</p>
        <div>
          <button disabled={disableoptions} onClick={() => handleRoute("yes")}>
            Yes
          </button>

          <button disabled={disableoptions} onClick={() => handleRoute("no")}>
            No
          </button>
        </div>
        {isEligible === true &&
          path ==
            "/reservation" && (
              <Link to={path}>
                <button>Next</button>
              </Link>
            )}
      </div>
    </>
  );
};

export default Questionnaire;

// conditionally render a two new inputs on a variable that will be set to true after completion of the questionnair
// asked married jointly and if they have dependents separate form to make another post.
// once send to schedule be able
