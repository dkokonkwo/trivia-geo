import creatorImg from "../../assests/img/creator.jpg";
import contactImg from "../../assests/img/contact.png";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Discuss } from "react-loader-spinner";

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = response.json();
    setFormDetails(formInitialDetails);
    if (result.code === 200) {
      setStatus({ success: true, message: "Message sent successfully" });
    } else {
      setStatus({
        success: false,
        message: "Something went wrong, please try again later",
      });
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <section>
      {loading ? (
        <Container fluid className="loading">
          <Discuss
            visible={true}
            height="150"
            width="150"
            ariaLabel="discuss-loading"
            wrapperStyle={{}}
            wrapperClass="discuss-wrapper"
            colors={["#ffffff", "#ffffff"]}
            backgroundColor="#ffffff"
          />
          <h3>...loading...</h3>
        </Container>
      ) : (
        <Container fluid className="big">
          <div className="py-4">
            <Row className="row-1">
              <h2>About Trivia Geo</h2>
              <Tabs
                justify
                variant="pills"
                defaultActiveKey="tab-1"
                className="mb-2 p-2"
              >
                <Tab eventKey="tab-1" title="Game">
                  <p className="tab-p">
                    At Trivia Geo, we aim to blend learning and enjoyment by
                    offering a trivia game that challenges your geographical
                    knowledge while keeping you entertained. Whether you're a
                    geography enthusiast or simply seeking a fun way to test
                    your global awareness, Trivia Geo is the ideal platform for
                    you. Powered by the TriviaDB API, our game features an
                    extensive collection of geography questions, ensuring
                    high-quality and up-to-date trivia content for an engaging
                    experience with each round.
                  </p>
                </Tab>
                <Tab eventKey="tab-2" title="Creator" className="about-me">
                  <h3>Meet the Creator</h3>
                  <img
                    src={creatorImg}
                    alt="about-img"
                    className="about-img"
                  ></img>
                  <p>
                    Trivia Geo was created by David Okonkwo, a passionate
                    developer dedicated to bringing educational and entertaining
                    experiences to users. Learn more about the creator and their
                    other projects by visiting his website{" "}
                    <a
                      href="https://dkokonkwo.github.io/portfolio/"
                      target="_blank"
                    >
                      <button>Here</button>
                    </a>
                  </p>
                </Tab>
                <Tab eventKey="tab-3" title="Contact">
                  <Container className="contact" id="connect">
                    <Row className="align-items-center">
                      <Col md={5}>
                        <img src={contactImg} alt="contact us" />
                      </Col>
                      <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                          <Row>
                            <Col sm={6} className="px-1">
                              <input
                                type="text"
                                value={formDetails.firstName}
                                placeholder="First Name"
                                onChange={(e) =>
                                  onFormUpdate("firstName", e.target.value)
                                }
                              />
                            </Col>
                            <Col sm={6} className="px-1">
                              <input
                                type="text"
                                value={formDetails.lastName}
                                placeholder="Last Name"
                                onChange={(e) =>
                                  onFormUpdate("lastName", e.target.value)
                                }
                              />
                            </Col>
                            <Col sm={6} className="px-1">
                              <input
                                type="email"
                                value={formDetails.email}
                                placeholder="Email Address"
                                onChange={(e) =>
                                  onFormUpdate("email", e.target.value)
                                }
                              />
                            </Col>
                            <Col sm={6} className="px-1">
                              <input
                                type="tel"
                                value={formDetails.phone}
                                placeholder="Phone No."
                                onChange={(e) =>
                                  onFormUpdate("phone", e.target.value)
                                }
                              />
                            </Col>
                            <Col>
                              <textarea
                                rows="4"
                                value={formDetails.message}
                                placeholder="Message"
                                onChange={(e) =>
                                  onFormUpdate("message", e.target.value)
                                }
                              ></textarea>
                              <button type="submit">
                                <span>{buttonText}</span>
                              </button>
                            </Col>
                            {status.message && (
                              <Col>
                                <p
                                  className={
                                    status.success === false
                                      ? "danger"
                                      : "success"
                                  }
                                >
                                  {status.message}
                                </p>
                              </Col>
                            )}
                          </Row>
                        </form>
                      </Col>
                    </Row>
                  </Container>
                </Tab>
              </Tabs>
            </Row>
          </div>
        </Container>
      )}
    </section>
  );
};
