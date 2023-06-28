import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API } from "../../utils/links";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducers/userData";

export const FavButton = ({ movieID }) => {
  const userData = useSelector((state) => state.userData);
  const token = localStorage.getItem("token");
  const [isFavorited, setFavorited] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.favorites.includes(movieID)) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [movieID]);

  const toggleFavorited = () => {
    if (!isFavorited) {
      fetch(`${API}/users/${userData._id}/movies/${movieID}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.text())
        .then((data) => {
          dispatch(setUserData({ ...userData, favorites: JSON.parse(data) }));
          setFavorited(true);
        })
        .catch((error) => console.error(error));
    } else if (isFavorited) {
      fetch(`${API}/users/${userData._id}/movies/${movieID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.text())
        .then((data) => {
          dispatch(setUserData({ ...userData, favorites: JSON.parse(data) }));
          setFavorited(false);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Button variant="link" className="p-0" onClick={() => toggleFavorited()}>
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
