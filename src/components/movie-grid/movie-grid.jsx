import { moviesType } from "../../utils/types";
import { MovieCard } from "../movie-card/movie-card";

export const MovieGrid = ({ movies }) => {
  return (
    <div className="grid-container">
      {movies.map((movie) => {
        return (
          <div className="mb-3" key={movie.id}>
            <MovieCard movieData={movie} />
          </div>
        );
      })}
    </div>
  );
};

MovieGrid.propTypes = {
  movies: moviesType.isRequired,
};
