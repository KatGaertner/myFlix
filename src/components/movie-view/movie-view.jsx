import propTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieView = ({ movies }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  const [isFavorited, setFavorited] = useState(false);

  const history = useNavigate();

  const { movieID } = useParams();
  const movieData = movies.find((movie) => movie.id === movieID);

  useEffect(() => {
    if (userData.favorites.includes(movieID)) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [movieID]);

  const toggleFavorited = () => {
    if (!isFavorited) {
      fetch(`http://127.0.0.1:8080/users/${userData._id}/movies/${movieID}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.text())
        .then((data) => {
          userData.favorites = JSON.parse(data);
          localStorage.setItem("userData", JSON.stringify(userData));
          setFavorited(true);
        })
        .catch((error) => console.log(error));
    } else if (isFavorited) {
      fetch(`http://127.0.0.1:8080/users/${userData._id}/movies/${movieID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.text())
        .then((data) => {
          userData.favorites = JSON.parse(data);
          localStorage.setItem("userData", JSON.stringify(userData));
          setFavorited(false);
        })
        .catch((error) => console.log(error));
    }
  };

  let genre = movieData.genres[0].name;
  let similarMovies = movies
    .filter((movie) => {
      return movie.genres.some((el) => el.name.includes(genre));
    })
    .filter((movie) => movie.title !== movieData.title);

  return (
    <>
      <Row className="rounded-4 bg-body">
        <Col sm={{ span: 4, order: "last" }}>
          <img className="w-100 d-none d-sm-block" src={movieData.imageURL} />
        </Col>
        <Col className="d-flex flex-column justify-content-between">
          <div>
            <h1>{movieData.title}</h1>
            <h2>{movieData.directors[0].name}</h2>
            <div>{movieData.summary}</div>
            <div className="text-end">{movieData.genres[0].name}</div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Button className="mb-3" onClick={() => history(-1)}>
              Go back
            </Button>
            <Button
              variant="link"
              className="p-0"
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
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <p>Similar movies:</p>
        <div className="grid-container">
          {similarMovies.map((movie) => {
            return (
              <div className="mb-3" key={movie.id}>
                <MovieCard
                  movieData={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </div>
            );
          })}
        </div>
      </Row>
    </>
  );
};

MovieView.propTypes = {
  movies: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.string.isRequired,
      summary: propTypes.string,
      directors: propTypes.arrayOf(
        propTypes.shape({
          name: propTypes.string.isRequired,
        })
      ).isRequired,
      genres: propTypes.arrayOf(
        propTypes.shape({
          name: propTypes.string.isRequired,
        })
      ).isRequired,
      imageURL: propTypes.string.isRequired,
    })
  ).isRequired,
};
