import { useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // layout
  const leftColumnWidth = 4;
  const rightColumnWidth = 12 - leftColumnWidth;

  const handleSubmit = (event) => {
    event.preventDefault(); // because default is reloading the entire page

    const data = {
      name: username,
      email: email,
      password: password,
      birthday: birthday,
    };

    if (event.target.reportValidity()) {
      fetch(`https://movie-api-93299-83ca7447ffdb.herokuapp.com/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            alert("Successfully signed up!");
          } else {
            let contentType = response.headers.get("content-type");
            if (contentType.includes("text/html")) {
              response.text().then((info) => alert(info));
            } else if (contentType.includes("application/json")) {
              response.json().then((info) => {
                alert(info.errors.map((e) => e.msg).join("\n"));
              });
            }
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Something went wrong.");
        });
    }
  };

  return (
    <div className="p-4 rounded-4 bg-body">
      <h1 className="text-center">Sign up</h1>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label
            column
            sm={leftColumnWidth}
            className="pe-5"
            htmlFor="username"
          >
            Username:*
          </Form.Label>
          <Col sm={rightColumnWidth}>
            <Form.Control
              type="text"
              id="username"
              aria-describedby="usernameText"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
          <Col sm={{ span: rightColumnWidth, offset: leftColumnWidth }}>
            <Form.Text id="usernameText">
              Usernames must have at least 5 characters and use only
              alphanumeric characters.{" "}
            </Form.Text>
          </Col>
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm={leftColumnWidth} htmlFor="email">
            E-Mail:*
          </Form.Label>
          <Col sm={rightColumnWidth}>
            <Form.Control
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm={leftColumnWidth} htmlFor="birthday">
            Birthday:
          </Form.Label>
          <Col sm={rightColumnWidth}>
            <Form.Control
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm={leftColumnWidth} htmlFor="password">
            Password:*
          </Form.Label>
          <Col sm={rightColumnWidth}>
            <Form.Control
              type="password"
              id="password"
              aria-describedby="passwordText"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </Col>
          <Col sm={{ span: rightColumnWidth, offset: leftColumnWidth }}>
            <Form.Text id="passwordText">
              Please choose a password with at least 8 characters.
            </Form.Text>
          </Col>
        </Form.Group>
        <Button className="mb-3 w-100" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
