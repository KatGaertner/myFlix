import { Navbar, Nav, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/userData";
import PropTypes from "prop-types";
import { OutsideAlerter } from "./navbarWrapper";

export const NavigationBar = ({ isLoading }) => {
  const token = useSelector((state) => state.userData.token);
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (
      !document.getElementById("navbar-toggler").classList.contains("collapsed")
    ) {
      document.getElementById("navbar-toggler").click();
    }
  };

  return (
    <OutsideAlerter handleToggle={handleToggle}>
      <Navbar
        bg="primary"
        expand="md"
        className="navbar-light w-100 bg-gradient my-navbar fixed-top"
        variant="light"
      >
        <Container fluid className="px-3">
          <Navbar.Brand as={Link} to="/" className="icon-link">
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
              />
              <Navbar.Collapse id="navbarCollapse">
                {!token ? (
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/login" onClick={handleToggle}>
                      Log in
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup" onClick={handleToggle}>
                      Sign up
                    </Nav.Link>
                  </Nav>
                ) : (
                  <>
                    <Nav className="align-items-top">
                      <Nav.Link as={Link} to="/" onClick={handleToggle}>
                        Home
                      </Nav.Link>
                      <Nav.Link as={Link} to="/profile" onClick={handleToggle}>
                        Profile
                      </Nav.Link>
                    </Nav>
                    <Form className="d-flex flex-column flex-md-row flex-fill align-items-top">
                      <Button
                        variant="outline-dark"
                        className="btn ms-auto"
                        onClick={() => {
                          handleToggle();
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
