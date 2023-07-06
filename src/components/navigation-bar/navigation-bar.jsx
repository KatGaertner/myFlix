import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/userData";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { deleteCookie } from "../../utils/cookies";
import PropTypes from "prop-types";

export const NavigationBar = ({ isLoading }) => {
  const token = useSelector((state) => state.userData.token);
  const dispatch = useDispatch();

  return (
    <Navbar
      bg="primary"
      expand="sm"
      sticky="top"
      className="w-100 mb-4 bg-gradient"
    >
      <Navbar.Brand as={Link} to="/" className="mx-3 icon-link">
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
            <Nav className="w-100 d-flex align-items-baseline">
              {!token ? (
                <>
                  <Nav.Link as={Link} to="/login">
                    Log in
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign up
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <MoviesFilter />
                  <Button
                    variant="outline-dark"
                    className="btn mx-3 ms-auto"
                    onClick={() => {
                      dispatch(logoutUser());
                      deleteCookie("token");
                    }}
                  >
                    <span style={{ fontFamily: "'Comfortaa', cursive" }}>
                      Logout
                    </span>
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

NavigationBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
