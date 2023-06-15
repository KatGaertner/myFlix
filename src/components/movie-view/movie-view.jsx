import { moviesType } from "../../utils/types";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FavButton } from "../fav-button/fav-button";

export const MovieView = ({ movies }) => {
  const history = useNavigate();

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
          <div className="d-flex flex-row justify-content-between">
            <Button className="mb-3" onClick={() => history(-1)}>
              Go back
            </Button>
            <FavButton movieID={movieID} />
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
                <MovieCard movieData={movie} />
              </div>
            );
          })}
        </div>
      </Row>
    </>
  );
};

MovieView.propTypes = {
  movies: moviesType.isRequired,
};
