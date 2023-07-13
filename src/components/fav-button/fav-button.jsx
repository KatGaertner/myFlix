import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API } from "../../utils/links";
import { useSelector, useDispatch } from "react-redux";
import { setUserFavorites } from "../../redux/reducers/userData";
import { checkAuth } from "../../utils/fetchErrorHandlers";

export const FavButton = ({ movieID }) => {
  const userData = useSelector((state) => state.userData);
  const [isFavorited, setFavorited] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isFavoriteMovie = userData.data.favorites.includes(movieID);
    setFavorited(isFavoriteMovie);
  }, [movieID]);

  const toggleFavorited = () => {
    if (!isFavorited) {
      fetch(`${API}/users/${userData.data._id}/movies/${movieID}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${userData.token}` },
      })
        .then((response) => {
          checkAuth(response);
          return response.text();
        })
        .then((data) => {
          console.log(JSON.parse(data));
          dispatch(setUserFavorites(JSON.parse(data)));
          setFavorited(true);
        })
        .catch((error) => console.error(error));
    } else if (isFavorited) {
      fetch(`${API}/users/${userData.data._id}/movies/${movieID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userData.token}` },
      })
        .then((response) => {
          checkAuth(response);
          return response.text();
        })
        .then((data) => {
          console.log(JSON.parse(data));
          dispatch(setUserFavorites(JSON.parse(data)));
          setFavorited(false);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Button
      variant="link"
      className="p-1 position-absolute top-0 end-0"
      onClick={() => toggleFavorited()}
    >
      {!isFavorited && (
        <img
          src={require("./fav-false.svg")}
          title="Add to favorites"
          width={"24px"}
          height={"24px"}
        />
      )}
      {isFavorited && (
        <img
          src={require("./fav-true.svg")}
          title="Remove from favorites"
          width={"24px"}
          height={"24px"}
        />
      )}
    </Button>
  );
};

FavButton.propTypes = {
  movieID: PropTypes.string.isRequired,
};
