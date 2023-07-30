import { Navbar, Nav, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/userData";
import PropTypes from "prop-types";
import { OutsideAlerter } from "./navbarWrapper";
import { useState } from "react";

export const NavigationBar = ({ isLoading }) => {
  const token = useSelector((state) => state.userData.token);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  return (
    <OutsideAlerter handleToggle={() => setExpanded(false)}>
      <Navbar
        bg="primary"
        expand="sm"
        className="navbar-light w-100 bg-gradient my-navbar fixed-top"
        variant="light"
        expanded={expanded}
      >
        <Container fluid className="px-3">
          <Navbar.Brand
            as={Link}
            to="/"
            className="icon-link"
            onClick={() => setExpanded(false)}
          >
            <img
              src={require("./logo.svg")}
              alt="Logo"
              width={"32px"}
              height={"32px"}
            />

            <span style={{ fontFamily: "'Comfortaa', cursive" }}>myFlix</span>
          </Navbar.Brand>
          {isLoading ? (
            <></>
          ) : (
            <>
              <Navbar.Toggle
                aria-controls="navbarCollapse"
                id="navbar-toggler"
                onClick={() => setExpanded(expanded ? false : true)}
              />
              <Navbar.Collapse id="navbarCollapse">
                {!token ? (
                  <Nav className="me-auto">
                    <Nav.Link
                      as={Link}
                      to="/login"
                      onClick={() => setExpanded(false)}
                    >
                      Log in
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/signup"
                      onClick={() => setExpanded(false)}
                    >
                      Sign up
                    </Nav.Link>
                  </Nav>
                ) : (
                  <>
                    <Nav className="align-items-top">
                      <Nav.Link
                        as={Link}
                        to="/"
                        onClick={() => setExpanded(false)}
                      >
                        Home
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/profile"
                        onClick={() => setExpanded(false)}
                      >
                        Profile
                      </Nav.Link>
                    </Nav>
                    <Form className="d-flex flex-column flex-md-row flex-fill align-items-top">
                      <Button
                        variant="outline-dark"
                        className="btn ms-auto"
                        onClick={() => {
                          setExpanded(false);
                          dispatch(logoutUser());
                        }}
                      >
                        <span style={{ fontFamily: "'Comfortaa', cursive" }}>
                          Logout
                        </span>
                      </Button>
                    </Form>
                  </>
                )}
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </OutsideAlerter>
  );
};

NavigationBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
