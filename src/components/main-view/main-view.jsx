import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-api-93299-83ca7447ffdb.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromAPI = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            summary: movie.summary,
            directors: movie.directors,
            featured: movie.featured,
            genres: movie.genres,
            imageURL: movie.imageURL,
          };
        });
        setMovies(moviesFromAPI);
      })
      .catch((error) => console.log(error));
  }, []);

  if (movies.length === 0) {
    return <div>No movies</div>;
  }

  if (selectedMovie) {
    let genre = selectedMovie.genres[0].name;
    let similarMovies = movies
      .filter((movie) => {
        return movie.genres.some((el) => el.name.includes(genre));
      })
      .filter((movie) => movie.title !== selectedMovie.title);

    return (
      <>
        <MovieView
          movieData={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <div>
          <p>Similar movies:</p>
          {similarMovies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div className="main">
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
