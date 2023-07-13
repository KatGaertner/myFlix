import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BackButton } from "../back-button/back-button";
import { useEffect, useState } from "react";
import { API } from "../../utils/links";
import { MovieGrid } from "../movie-grid/movie-grid";
import { useSelector } from "react-redux";
import { checkAuth } from "../../utils/fetchErrorHandlers";

export const GenreView = () => {
  const movies = useSelector((state) => state.movies.list);
  const token = useSelector((state) => state.userData.token);
  const { genreName } = useParams();
  const [genreData, setgenreData] = useState({});
  const genreMovies = movies.filter(
    (movie) => movie.genres[0].name === genreName
  );

  useEffect(() => {
    fetch(`${API}/genres/${genreName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        checkAuth(response);
        return response.json();
      })
      .then((data) => {
        setgenreData(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
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
    </>
  );
};
