import { moviesType } from "../../utils/types";
import { MovieCard } from "../movie-card/movie-card";
import { useSelector } from "react-redux";

export const MovieGrid = ({
  movies = useSelector((state) => state.movies.list),
}) => {
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter)
  );

  return (
    <div className="grid-container">
      {movies.length === 0 ? (
        <div>nothing found</div>
      ) : (
        filteredMovies.map((movie) => {
          return (
            <div className="" key={movie.id}>
              <MovieCard movieData={movie} />
            </div>
          );
        })
      )}
    </div>
  );
};

MovieGrid.propTypes = {
  movies: moviesType,
};
