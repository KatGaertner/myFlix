import propTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies }) => {
  const { movieID } = useParams();
  const movieData = movies.find((movie) => movie.id === movieID);

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
          <div>
            <Link to={"/"}>
              <Button className="mb-3" type="link">
                Go back
              </Button>
            </Link>
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
