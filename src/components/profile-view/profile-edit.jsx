import { Col, Row, Button, Form } from "react-bootstrap";
import { PasswordField } from "../password-field/password-field";
import { leftColumnWidth, rightColumnWidth } from "./layout";
import PropTypes from "prop-types";

export const ProfileEdit = ({
  userData,
  newUserData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-1" as={Row}>
        <Form.Label
          column
          sm={leftColumnWidth}
          className="pe-5"
          htmlFor="newUsername"
        >
          New Username:
        </Form.Label>
        <Col sm={rightColumnWidth}>
          <Form.Control
            type="text"
            id="newUsername"
            defaultValue={userData.name}
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
      <Form.Group className="mb-1" as={Row}>
        <Form.Label column sm={leftColumnWidth} htmlFor="newEmail">
          New E-Mail:
        </Form.Label>
        <Col sm={rightColumnWidth}>
          <Form.Control
            type="email"
            id="newEmail"
            defaultValue={userData.email}
            autoComplete="e-mail"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mb-1" as={Row}>
        <Form.Label column sm={leftColumnWidth} htmlFor="newBirthday">
          New Birthday:
        </Form.Label>
        <Col sm={rightColumnWidth}>
          <Form.Control
            type="date"
            id="newBirthday"
            defaultValue={userData.birthday}
            autoComplete="bday"
            onChange={(e) => handleChange("birthday", e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3" as={Row}>
        <Form.Label column sm={leftColumnWidth} htmlFor="newPassword">
          New Password:
        </Form.Label>
        <Col sm={rightColumnWidth}>
          <PasswordField
            autocomplete={"new-password"}
            fieldID={"newPassword"}
            fieldValue={""}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </Col>
      </Form.Group>
      <Button className="mb-3 w-100" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

ProfileEdit.propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date),
    favorites: PropTypes.arrayOf(PropTypes.string),
  }),
  newUserData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.instanceOf(Date),
    favorites: PropTypes.arrayOf(PropTypes.string),
  }),
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
