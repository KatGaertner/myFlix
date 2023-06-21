import { moviesType } from "../../utils/types";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FavButton } from "../fav-button/fav-button";
import { BackButton } from "../back-button/back-button";
import { SimilarMovies } from "./similar-movies";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MovieView = () => {
  const movies = useSelector((state) => state.movies);

  const { movieID } = useParams();
  const movieData = movies.find((movie) => movie.id === movieID);

  return (
    <div className="p-4">
      <Row>
        <Col sm={{ span: 4, order: "last" }}>
          <img className="w-100 d-none d-sm-block" src={movieData.imageURL} />
        </Col>
        <Col className="d-flex flex-column justify-content-between">
          <div>
            <h1>{movieData.title}</h1>
            <h2>
              <Link to={`/directors/${movieData.directors[0].name}`}>
                {movieData.directors[0].name}
              </Link>
            </h2>
            <div>{movieData.summary}</div>
            <div className="text-end">
              <Link to={`/genres/${movieData.genres[0].name}`}>
                {movieData.genres[0].name}
              </Link>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <BackButton />
            <FavButton movieID={movieID} />
          </div>
        </Col>
      </Row>
      <hr />
      <div>
        <SimilarMovies movieID={movieID} />
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: moviesType.isRequired,
};
