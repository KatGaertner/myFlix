import { moviesType } from "../../utils/types";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MovieGrid } from "../movie-grid/movie-grid";
import { ProfileShow } from "./profile-show";
import { ProfileEdit } from "./profile-edit";
import { API } from "../../utils/links";
import { PropTypes } from "prop-types";

export const ProfileView = ({
  movies,
  storedUser,
  storedToken,
  onLoggedOut,
}) => {
  const [newUserData, setNewUserData] = useState({});
  const [isOnEdit, setOnEdit] = useState(false);
  const [userData, setUserData] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedUser);
    let storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

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
        fetch(`${API}/users/${userData._id}`, {
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
            setUserData(data);
            localStorage.setItem("userData", JSON.stringify(data));
            handleToggle();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    let response = confirm("Are you sure you want to delete your profile?");

    if (response) {
      fetch(`${API}/users/${userData._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw Error;
          }
        })
        .then((message) => {
          alert(message);
          onLoggedOut();
        })
        .catch(() => {
          alert("Something went wrong.");
        });
    }
  };

  return (
    <>
      <h2 className="d-inline-block">Your profile </h2>
      {!isOnEdit && (
        <>
          <Button
            className="ms-3 mb-2"
            variant="primary"
            onClick={handleToggle}
          >
            Edit
          </Button>

          <ProfileShow userData={userData} />
        </>
      )}

      {isOnEdit && (
        <>
          <Button
            className="ms-3 mb-2"
            variant="secondary"
            onClick={handleToggle}
          >
            Exit
          </Button>

          <ProfileEdit
            userData={userData}
            newUserData={newUserData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
          />
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
  onLoggedOut: PropTypes.func.isRequired,
};
