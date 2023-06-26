import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PasswordField } from "../password-field/password-field";
import { API } from "../../utils/links";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // because default is reloading the entire page

    const data = {
      username: username,
      password: password,
    };

    fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userData) {
          localStorage.setItem("userData", JSON.stringify(data.userData));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.userData, data.token);
        } else {
          alert(data.info.message);
        }
      })
      .catch((error) => {
        alert("Something went wrong.");
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-center">Log in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mb-2"
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <PasswordField
          className={"mb-2"}
          fieldID={"newPassword"}
          fieldPlaceholder={"Password"}
          fieldValue={password}
          onChange={(e) => setPassword(e.target.value)}
          autocomplete={"current-password"}
          required={true}
        />
        <Form.Check
          className="mb-2 mx-1"
          type="checkbox"
          id="keepLogInCheck"
          label="Keep me logged in"
          defaultChecked={true}
        />
        <Button className="mb-3 w-100" type="submit">
          Log in
        </Button>
      </Form>
      <div className="d-flex justify-content-between rounded-4 bg-body">
        <hr className="flex-grow-1" />
        <span className="mx-3"> or </span>
        <hr className="flex-grow-1" />
      </div>
      <Link to="/signup">
        <Button className="btn-secondary w-100 mt-3">Sign up</Button>
      </Link>
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
