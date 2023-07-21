import { Navbar, Nav, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/userData";
import PropTypes from "prop-types";

export const NavigationBar = ({ isLoading }) => {
  const token = useSelector((state) => state.userData.token);
  const dispatch = useDispatch();

  return (
    <Navbar
      bg="primary"
      expand="md"
      className="navbar-light w-100 bg-gradient my-navbar fixed-top"
      variant="light"
    >
      <Container fluid className="py-1 px-3">
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
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              {!token ? (
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/login">
                    Log in
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign up
                  </Nav.Link>
                </Nav>
              ) : (
                <>
                  <Nav className="align-items-top">
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                      Profile
                    </Nav.Link>
                  </Nav>
                  <Form className="d-flex flex-column flex-md-row flex-fill align-items-top">
                    <Button
                      variant="outline-dark"
                      className="btn ms-auto"
                      onClick={() => {
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
  );
};

NavigationBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
