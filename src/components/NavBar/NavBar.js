import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assests/img/Designer.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Play from "../Play/Play";
import Home from "../Home/Home";
import About from "../About/About";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const onUpdateActivelink = (value) => {
    setActiveLink(value);
  };

  const [expanded, setExpanded] = useState(false);

  const handleNavigation = () => {
    setExpanded(false);
  };

  return (
    <Router>
      <Navbar expand="lg" className="scrolled" expanded={expanded}>
        <Container className="container">
          <Navbar.Brand as={Link} to={"/"}>
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="custom-navbar-collapse"
          >
            <Nav className="me-auto" onClick={handleNavigation}>
              <Nav.Link
                as={Link}
                to={"/"}
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActivelink("home")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/play"}
                className={
                  activeLink === "play" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActivelink("play")}
              >
                Play
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/about"}
                className={
                  activeLink === "about" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActivelink("about")}
              >
                About
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a
                  href="https://www.linkedin.com/in/david-okonkwo"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    color="#131313"
                    className="icons"
                  />
                </a>
                <a href="#" target="_blank">
                  <FontAwesomeIcon
                    icon={faGithub}
                    color="#131313"
                    className="icons"
                  />
                </a>
                <a href="#" target="_blank">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    color="#131313"
                    className="icons"
                  />
                </a>
              </div>
              <LinkContainer to="/About" className="vvd">
                <button onClick={() => console.log("connect")}>
                  <span className="connect">
                    <h5>CONNECT</h5>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      color="#131313"
                      className="icons"
                    />
                  </span>
                </button>
              </LinkContainer>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/play" element={<Play />} />
          <Route path="/" element={<Home />} />
          <Route path="/trivia-geo" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default NavBar;
