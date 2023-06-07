import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // only fetch list when token is there
    if (!token) {
      return;
    }

    fetch("http://127.0.0.1:8080/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
  }, [token]); // dependency array, ensures fetch is called when token changes

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

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
    <>
      <div>
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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </>
  );
};
