import { moviesType } from "../../utils/types";
import { Col, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { PasswordField } from "../password-field/password-field";
import { MovieGrid } from "../movie-grid/movie-grid";
import { leftColumnWidth, rightColumnWidth } from "./layout";
import { ProfileShow } from "./profile-show";

export const ProfileView = ({ movies }) => {
  const [newUserData, setNewUserData] = useState({});
  const [isOnEdit, setOnEdit] = useState(false);

  let userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  const handleToggle = () => {
    setOnEdit(!isOnEdit);
    setNewUserData({});
  };

  const handleChange = (key, value) => {
    let update = { [key]: value };
    setNewUserData((newUserData) => ({ ...newUserData, ...update }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isEmpty = (obj) => {
      if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true;
      } else {
        return false;
      }
    };

    let data = {};

    if (event.target.reportValidity()) {
      ["name", "email", "birthday"].forEach((key) => {
        if (newUserData[key] && newUserData[key] !== userData[key]) {
          data[key] = newUserData[key];
          console.log("Changed " + key);
        }
      });
      if (newUserData.password) {
        data.password = newPassword;
        console.log("Changed Password");
      }

      if (!isEmpty(data)) {
        fetch(`http://127.0.0.1:8080/users/${userData._id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              let contentType = response.headers.get("content-type");
              if (contentType.includes("text/html")) {
                response.text().then((info) => alert(info));
                throw "Error";
              } else if (contentType.includes("application/json")) {
                response.json().then((info) => {
                  alert(info.errors.map((e) => e.msg).join("\n"));
                });
                throw "Error";
              }
            }
          })
          .then((data) => {
            userData = data;
            localStorage.setItem("userData", JSON.stringify(data));
            handleToggle();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      {!isOnEdit && (
        <>
          <h2 className="d-inline-block">Your profile </h2>
          <Button className="ms-3" variant="primary" onClick={handleToggle}>
            Edit
          </Button>

          <ProfileShow userData={userData} />
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
                  defaultValue={userData.name}
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
                E-Mail:
              </Form.Label>
              <Col sm={rightColumnWidth}>
                <Form.Control
                  type="email"
                  id="newEmail"
                  defaultValue={userData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  defaultValue={userData.birthday}
                  onChange={(e) => handleChange("birthday", e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={leftColumnWidth} htmlFor="newPassword">
                Password:
              </Form.Label>
              <Col sm={rightColumnWidth}>
                <PasswordField
                  fieldID={"newPassword"}
                  fieldValue={newUserData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Col>
            </Form.Group>
            <Button className="mb-3 w-100" type="submit">
              Save Changes
            </Button>
          </Form>
        </>
      )}

      <h2>Your favorites</h2>
      <MovieGrid
        movies={movies.filter((movie) => userData.favorites.includes(movie.id))}
      />
    </>
  );
};

ProfileView.propTypes = {
  movies: moviesType.isRequired,
};
