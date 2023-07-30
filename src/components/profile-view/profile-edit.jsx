import { Col, Row, Button, Form } from "react-bootstrap";
import { PasswordField } from "../password-field/password-field";
import { leftColumnWidth, rightColumnWidth } from "./layout";
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const ProfileEdit = ({ handleUpdate, handleDelete, handleToggle }) => {
  const userData = useSelector((state) => state.userData.data);
  const [newUserData, setNewUserData] = useState({
    name: userData.name,
    email: userData.email,
    birthday: userData.birthday ? userData.birthday.substring(0, 10) : "",
    password: "",
  });

  const handleChange = (key, value) => {
    const change = { [key]: value };
    setNewUserData((newUserData) => ({ ...newUserData, ...change }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let update = {};

    if (event.target.reportValidity()) {
      ["name", "email", "birthday"].forEach((key) => {
        if (newUserData[key] && newUserData[key] !== userData[key]) {
          update[key] = newUserData[key];
        }
      });
      if (newUserData.password) {
        update.password = newUserData.password;
      }
    }
    handleUpdate(update);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        <div className="d-flex button-container">
          <Button className="" onClick={handleToggle}>
            Exit
          </Button>
          <Button className="mx-2" type="submit">
            Save
          </Button>
          <Button className="ms-auto btn-secondary" onClick={handleDelete}>
            Delete profile
          </Button>
        </div>
        <Form.Group as={Row} className="edit-row">
          <Form.Label
            column
            sm={leftColumnWidth}
            className="edit-left"
            htmlFor="newUsername"
          >
            New Username:
          </Form.Label>
          <Col sm={rightColumnWidth} className="edit-right">
            <Form.Control
              type="text"
              id="newUsername"
              value={newUserData.name}
              autoComplete="username"
              onChange={(e) => handleChange("name", e.target.value)}
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
        <Form.Group as={Row} className="edit-row">
          <Form.Label
            column
            sm={leftColumnWidth}
            htmlFor="newEmail"
            className="edit-left"
          >
            New E-Mail:
          </Form.Label>
          <Col sm={rightColumnWidth} className="edit-right">
            <Form.Control
              type="email"
              id="newEmail"
              value={newUserData.email}
              autoComplete="email"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="edit-row">
          <Form.Label
            column
            sm={leftColumnWidth}
            htmlFor="newBirthday"
            className="edit-left"
          >
            New Birthday:
          </Form.Label>
          <Col sm={rightColumnWidth} className="edit-right">
            <Form.Control
              type="date"
              id="newBirthday"
              value={newUserData.birthday}
              autoComplete="bday"
              onChange={(e) => handleChange("birthday", e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="edit-row">
          <Form.Label
            column
            sm={leftColumnWidth}
            htmlFor="newPassword"
            className="edit-left"
          >
            New Password:
          </Form.Label>
          <Col sm={rightColumnWidth} className="edit-right">
            <PasswordField
              autocomplete={"new-password"}
              fieldID={"newPassword"}
              fieldValue={newUserData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

ProfileEdit.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
};
