import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BackButton } from "../back-button/back-button";
import { useEffect, useState } from "react";
import { API } from "../../utils/links";
import { MovieGrid } from "../movie-grid/movie-grid";
import { useSelector } from "react-redux";
import { checkAuth } from "../../utils/fetchErrorHandlers";
import { LoadingInfo } from "../main-view/loading-info";

export const GenreView = () => {
  const movies = useSelector((state) => state.movies.list);
  const token = useSelector((state) => state.userData.token);
  const { genreName } = useParams();
  const [genreData, setgenreData] = useState({});
  const genreMovies = movies.filter(
    (movie) => movie.genres[0].name === genreName
  );
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingInfo />
      ) : (
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
      )}
    </>
  );
};
