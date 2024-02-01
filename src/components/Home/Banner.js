import { Container, Row, Col } from "react-bootstrap";
import postcard1 from "../../assests/img/post1.png";
import postcard2 from "../../assests/img/immap.png";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";
import { ProgressBar } from "react-loader-spinner";


export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = [" WELCOME TO TRIVIA GEO..", "TEST YOUR KNOWLEDGE"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 5000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {loading ? (
        <Container fluid className="loading">
          <ProgressBar
            visible={true}
            height="200"
            width="300"
            barColor="#121212"
            borderColor="#ffffff"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <h3>...loading...</h3>
        </Container>
      ) : (
          <Container fluid className="skill" id="skills">
            <div className="skill-box">
              <h1>
                {`Hi! `}
                <span className="wrap">{text}</span>
              </h1>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="skill-slider"
              >
                <div className="item">
                  <p>
                    volutpat blandit aliquam etiam erat velit scelerisque in
                    dictum non consectetur a erat nam at lectus urna duis
                    convallis convallis tellus id interdum velit laoreet id
                    donec ultrices tincidunt arcu !
                  </p>
                  <img src={postcard1} alt="postcard" />
                </div>
                <div className="item">
                  <p>
                    volutpat blandit aliquam etiam erat velit scelerisque in
                    dictum non consectetur a erat nam at lectus urna duis
                    convallis convallis tellus id interdum velit laoreet id
                    donec ultrices tincidunt arcu !
                  </p>
                  <img src={postcard2} alt="postcard" />
                </div>
              </Carousel>
              <LinkContainer to="/play">
                <button className="play">
                  <span>PLAY</span>
                  <FontAwesomeIcon icon={faPlay} className="icons" />
                </button>
              </LinkContainer>
            </div>
          </Container>
      )}
    </>
  );
};
