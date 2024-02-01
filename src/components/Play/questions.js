import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Questions.css";

export const Questions = () => {
  const [numHearts, setNumHearts] = useState(3);
  const [score, setScore] = useState(3);

  return (
    <Container fluid className="main-game">
      {/* {isCorrect !== null && <p>{isCorrect ? "Correct!" : "Incorrect."}</p>} */}
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
      {/* <Row className="question-section">
        <Row className="prompt">
          <p>{questions.results[currentQuestionIndex].question}</p>
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
      </Row> */}
    </Container>
  );
};
