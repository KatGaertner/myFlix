import { useState } from "react";
import { Button, Form, Col, Row, ModalTitle } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // because default is reloading the entire page

    const data = {
      username: username,
      password: password,
    };

    fetch("http://127.0.0.1:8080/login", {
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
    <div class="p-4 rounded-4 bg-body">
      <h1 class="text-center">Log in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mb-2"
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Form.Control
          className="mb-2"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Check
          className="mb-2 mx-1"
          type="checkbox"
          id="keepLogInCheck"
          label="Keep me logged in"
          defaultChecked={true}
        />
        <Button className="mb-3 w-100" type="submit">
          Login
        </Button>
      </Form>
      <div class="d-flex justify-content-between rounded-4 bg-body">
        <hr class="flex-grow-1" />
        <span class="mx-3"> or </span>
        <hr class="flex-grow-1" />
      </div>
      <Link to="/signup">
        <Button className="btn-secondary w-100 mt-3">Sign up</Button>
      </Link>
    </div>
  );
};
