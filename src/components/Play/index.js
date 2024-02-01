import { Container, Row, Col, Modal, ModalBody } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, isValidElement } from "react";
import { ProgressBar } from "react-loader-spinner";
import "./Questions.css";

export const Index = () => {
  // LOADING
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState(0);
  const [difficulty, setDifficulty] = useState("none");
  const [questions, setQuestions] = useState({ results: [] });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [options, setOptions] = useState([]);
  const [numHearts, setNumHearts] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  // SET NUM OF LIVES AND DIFFICULTY LEVEL FUNCTION
  const addLife = (value, diff) => {
    setLives(value);
    setDifficulty(diff);
    setScore(0);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
    setNumHearts(value);
  };

  // RANDOMIZE OPTIONS
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  // FETCH DATA FUNCTION
  const apiUrl = `https://opentdb.com/api.php?amount=20&category=22&difficulty=${difficulty}&type=multiple`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        setQuestions(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [difficulty]);

  console.log(questions);

  // Function to shuffle options
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    if (questions && questions.length !== 0) {
      const currentQuestion = questions.results[currentQuestionIndex];

      if (currentQuestion) {
        const allOptions = [
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer,
        ];

        shuffleArray(allOptions);

        setOptions(allOptions);
      }
    }
  }, [questions, currentQuestionIndex]);

  // CHECK FOR CORRECT OR WRONG ANSWER
  const handleOptionClick = (selectedOption) => {
    setUserAnswer(selectedOption);
    const isAnswerCorrect =
      selectedOption === questions.results[currentQuestionIndex].correct_answer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect && score < 30) {
      setScore(score + 3);
    } else if (!isAnswerCorrect && lives > 0) {
      setLives(lives - 1);
      setNumHearts(numHearts - 1);
    }
    // Delay for a moment before moving to the next question
    setTimeout(() => {
      setUserAnswer(null);
      setIsCorrect(null);

      if (currentQuestionIndex + 1 < questions.results.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Handle the end of the trivia, e.g., display a "Game Over" message
        console.log("Game Over");
      }
    }, 2000); // Adjust the delay as needed
  };

  return (
    <>
      {loading ? (
        <Container fluid className="loading">
          <ProgressBar
            visible={true}
            height="200"
            width="200"
            barColor="#121212"
            borderColor="#ffffff"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <h3>...loading...</h3>
        </Container>
      ) : difficulty !== "none" && lives > 0 ? (
        <Container fluid className="main-game">
          {isCorrect !== null && (
            <Modal show={userAnswer}>
              <Modal.Body>{isCorrect ? "Correct!" : "Incorrect."}</Modal.Body>
            </Modal>
          )}
          <Row className="header">
            <Col sm={2} className="lives">
              <h5>LIVES:</h5>
              {Array.from({ length: numHearts }, (_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
              ))}
            </Col>
            <Col sm={2} className="score">
              <h5>SCORE:</h5>
              <h5>{score}/30</h5>
            </Col>
          </Row>
          <Row className="question-section">
            <Row className="prompt">
              <h3
                dangerouslySetInnerHTML={{
                  __html: questions.results[currentQuestionIndex].question,
                }}
              />
            </Row>
            <Row className="multiple">
              <Col lg={6} className="col-1">
                <button onClick={() => handleOptionClick(options[0])}>
                  {options[0]}
                </button>
                <button onClick={() => handleOptionClick(options[1])}>
                  {options[1]}
                </button>
              </Col>
              <Col lg={6} className="col-1">
                <button onClick={() => handleOptionClick(options[2])}>
                  {options[2]}
                </button>
                <button onClick={() => handleOptionClick(options[3])}>
                  {options[3]}
                </button>
              </Col>
            </Row>
          </Row>
        </Container>
      ) : (
        <Container fluid className="game">
          <div className="options">
            <h3>Select Difficulty</h3>
            <Row className="options-child">
              <button
                className="difficulty"
                id="palm"
                onClick={() => addLife(5, "easy")}
              >
                <h1>EASY</h1>
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
              </button>
              <button
                className="difficulty"
                id="river"
                onClick={() => addLife(3, "medium")}
              >
                <h1>MEDIUM</h1>
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
              </button>
              <button
                className="difficulty"
                id="mountn"
                onClick={() => addLife(3, "hard")}
              >
                <h1>HARD</h1>
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
              </button>
              <button
                className="difficulty"
                id="hotair"
                onClick={() => addLife(4, "hard")}
              >
                <h1>RANDOM</h1>
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FF3131"
                  className="heart"
                />
              </button>
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};
