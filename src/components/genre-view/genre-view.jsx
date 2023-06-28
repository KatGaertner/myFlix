import { moviesType } from "../../utils/types";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BackButton } from "../back-button/back-button";
import { useEffect, useState } from "react";
import { API } from "../../utils/links";
import { MovieGrid } from "../movie-grid/movie-grid";

export const GenreView = ({ movies }) => {
  const { genreName } = useParams();
  const [genreData, setgenreData] = useState({});
  const genreMovies = movies.filter(
    (movie) => movie.genres[0].name === genreName
  );

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetch(`${API}/genres/${genreName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setgenreData(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4">
      <Row>
        <Col className="d-flex flex-column justify-content-between">
          <h1>{genreData.name}</h1>
          <div className="mb-2">{genreData.description}</div>
          <div>
            <BackButton />
          </div>
        </Col>
      </Row>
      <hr />
      <div>
        <p>Movies with the genre {genreData.name}:</p>
        <MovieGrid movies={genreMovies} />
      </div>
    </div>
  );
};

GenreView.propTypes = {
  movies: moviesType.isRequired,
};
