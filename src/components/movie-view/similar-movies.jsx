import PropTypes from "prop-types";
import { MovieGrid } from "../movie-grid/movie-grid";
import { useSelector } from "react-redux";

export const SimilarMovies = ({ movieID }) => {
  const movies = useSelector((state) => state.movies.list);
  const movieData = movies.find((movie) => movie.id === movieID);

  let genre = movieData.genres[0].name;
  let similarMovies = movies
    .filter((movie) => {
      return movie.genres.some((el) => el.name.includes(genre));
    })
    .filter((movie) => movie.title !== movieData.title);

  return (
    <>
      <p>Similar movies:</p>
      <MovieGrid movies={similarMovies} />
    </>
  );
};

SimilarMovies.propTypes = {
  movieID: PropTypes.string.isRequired,
};
