import propTypes from "prop-types";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { useState } from "react";

export const ProfileView = ({ movies }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [isOnEdit, setOnEdit] = useState(false);

  userData = JSON.parse(localStorage.getItem("userData"));

  // layout
  const leftColumnWidth = 3;
  const rightColumnWidth = 12 - leftColumnWidth;

  const handleToggle = () => {
    setOnEdit(!isOnEdit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {};

    if (event.target.reportValidity()) {
      if (newUsername && newUsername !== userData.name) {
        data.name = newUsername;
        console.log("Change username");
      }
      if (newEmail && newEmail !== userData.email) {
        data.email = newEmail;
        console.log("Change Email");
      }
      if (newBirthday && newBirthday !== userData.birthday) {
        data.birthday = newBirthday;
        console.log("Change Birthday");
      }
      console.log(data);

      // add API here
      // save changes to local storage!

      // only on success
      handleToggle();

      // reset
      setNewUsername("");
      setNewEmail("");
      setNewBirthday("");
    }
  };

  const showBirthday = (datafield) => {
    if (datafield) {
      return datafield;
    } else {
      return <i>not set</i>;
    }
  };

  const favMovies = movies.filter((movie) =>
    userData.favorites.includes(movie.id)
  );

  return (
    <>
      {!isOnEdit && (
        <>
          <h2 className="d-inline-block">Your profile </h2>
          <Button className="ms-3" variant="primary" onClick={handleToggle}>
            Edit
          </Button>

          <Row className="my-3">
            <Col sm={leftColumnWidth} className="">
              Username:
            </Col>
            <Col sm={rightColumnWidth}>{userData.name}</Col>
          </Row>
          <Row className="my-3">
            <Col sm={leftColumnWidth} className="">
              E-Mail:
            </Col>
            <Col sm={rightColumnWidth}>{userData.email}</Col>
          </Row>
          <Row className="my-3">
            <Col sm={leftColumnWidth} className="">
              Birthday:
            </Col>
            <Col sm={rightColumnWidth}>{showBirthday(userData.birthday)}</Col>
          </Row>
        </>
      )}

      {isOnEdit && (
        <>
          <h2 className="d-inline-block">Your profile </h2>
          <Button className="ms-3" variant="secondary" onClick={handleToggle}>
            Exit
          </Button>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-1" as={Row}>
              <Form.Label
                column
                sm={leftColumnWidth}
                className="pe-5"
                htmlFor="newUsername"
              >
                Username:
              </Form.Label>
              <Col sm={rightColumnWidth}>
                <Form.Control
                  type="text"
                  id="newUsername"
                  // value={newUsername}
                  defaultValue={userData.name}
                  onChange={(e) => setNewUsername(e.target.value)}
                  minLength={5}
                  pattern="^[a-zA-Z0-9]*$"
                  onInvalid={(e) => {
                    if (e.target.validity.patternMismatch) {
                      e.target.setCustomValidity(
                        "Username can only use alphanumeric characters."
                      );
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                />
              </Col>
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1" as={Row}>
              <Form.Label column sm={leftColumnWidth} htmlFor="newEmail">
                E-Mail:
              </Form.Label>
              <Col sm={rightColumnWidth}>
                <Form.Control
                  type="email"
                  id="newEmail"
                  // value={newEmail}
                  defaultValue={userData.email}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-1" as={Row}>
              <Form.Label column sm={leftColumnWidth} htmlFor="newBirthday">
                Birthday:
              </Form.Label>
              <Col sm={rightColumnWidth}>
                <Form.Control
                  type="date"
                  id="newBirthday"
                  // value={newBirthday}
                  defaultValue={userData.birthday}
                  onChange={(e) => setNewBirthday(e.target.value)}
                />
              </Col>
            </Form.Group>
            {/* <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={leftColumnWidth} htmlFor="newPassword">
                Password:
              </Form.Label>
              <Col sm={rightColumnWidth}>
                <Form.Control
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </Col>
            </Form.Group> */}
            <Button className="mb-3 w-100" type="submit">
              Save Changes
            </Button>
          </Form>
        </>
      )}

      <h2>Your favorites</h2>
      <div className="grid-container">
        {favMovies.map((movie) => {
          return (
            <div className="mb-3" key={movie.id}>
              <MovieCard movieData={movie} />
            </div>
          );
        })}
      </div>
    </>
  );
};
