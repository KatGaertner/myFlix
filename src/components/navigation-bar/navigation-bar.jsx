import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  console.log(user);

  return (
    <Navbar
      fluid
      bg="primary"
      expand="sm"
      sticky="top"
      className="w-100 mb-4 bg-gradient"
    >
      <Navbar.Brand as={Link} to="/" className="mx-3 icon-link">
        <img
          src={require("./tv.svg")}
          alt="Logo"
          width={"24px"}
          height={"24px"}
        />
        <span style={{ fontFamily: "'Comfortaa', cursive" }}>myFlix</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="w-100 d-flex align-items-baseline">
          {!user ? (
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
              <Button
                className="btn-secondary mx-3 ms-auto"
                onClick={onLoggedOut}
              >
                <span style={{ fontFamily: "'Comfortaa', cursive" }}>
                  Logout
                </span>
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
