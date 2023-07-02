import { useState } from "react";
import { MovieGrid } from "../movie-grid/movie-grid";
import { ProfileShow } from "./profile-show";
import { ProfileEdit } from "./profile-edit";
import { API } from "../../utils/links";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserToken } from "../../redux/reducers/userData";
import { deleteCookie } from "../../utils/cookies";

export const ProfileView = () => {
  const movies = useSelector((state) => state.movies.list);
  const [isOnEdit, setOnEdit] = useState(false);
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const isEmpty = (obj) => {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    } else {
      return false;
    }
  };

  const handleToggle = () => {
    setOnEdit(!isOnEdit);
  };

  const handleUpdate = (data) => {
    if (!isEmpty(data)) {
      fetch(`${API}/users/${userData.data._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userData.token}`,
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
          dispatch(setUserData(data));
          handleToggle();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    let response = confirm("Are you sure you want to delete your profile?");

    if (response) {
      fetch(`${API}/users/${userData.data._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userData.token}`,
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
          dispatch(setUserData({}));
          dispatch(setUserToken(""));
          deleteCookie("token");
        })
        .catch(() => {
          alert("Something went wrong.");
        });
    }
  };

  return (
    <>
      {!isEmpty(userData) && (
        <>
          <h2 className="">Your profile </h2>
          {!isOnEdit && (
            <>
              <ProfileShow handleToggle={handleToggle} />
            </>
          )}
          {isOnEdit && (
            <>
              <ProfileEdit
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            </>
          )}
          <h2>Your favorites</h2>
          <MovieGrid
            movies={movies.filter((movie) =>
              userData.data.favorites.includes(movie.id)
            )}
          />
        </>
      )}
    </>
  );
};
