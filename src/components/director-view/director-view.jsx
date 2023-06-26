import { moviesType } from "../../utils/types";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BackButton } from "../back-button/back-button";
import { useEffect, useState } from "react";
import { API } from "../../utils/links";
import { MovieGrid } from "../movie-grid/movie-grid";

export const DirectorView = ({ movies }) => {
  const { directorName } = useParams();
  const [directorData, setDirectorData] = useState({});
  const directorMovies = movies.filter(
    (movie) => movie.directors[0].name === directorName
  );

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetch(`${API}/directors/${directorName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDirectorData(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4">
      <Row>
        <Col className="d-flex flex-column justify-content-between">
          <h1>{directorData.name}</h1>
          <div className="fst-italic mb-2">
            {[directorData.birthyear, directorData.deathyear].reduce(
              (birth, death) => {
                return "*" + birth + (death ? ",  \u271D" + death : "");
              }
            )}
          </div>
          <div className="mb-2">{directorData.biography}</div>
          <div>
            <BackButton />
          </div>
        </Col>
      </Row>
      <hr />
      <div>
        <p>Movies by {directorData.name}:</p>
        <MovieGrid movies={directorMovies} />
      </div>
    </div>
  );
};

DirectorView.propTypes = {
  movies: moviesType.isRequired,
};
