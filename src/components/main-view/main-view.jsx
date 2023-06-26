import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Row, Button } from "react-bootstrap";

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

    fetch("https://movie-api-93299-83ca7447ffdb.herokuapp.com/movies", {
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
      .catch((error) => console.error(error));
  }, [token]); // dependency array, ensures fetch is called when token changes

  const renderView = () => {
    if (!user) {
      return (
        <Col lg={7} xl={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <div className="d-flex justify-content-between rounded-4 bg-body">
            <hr className="flex-grow-1" />
            <span className="mx-3"> or </span>
            <hr className="flex-grow-1" />
          </div>
          <br />
          <SignupView />
        </Col>
      );
    }

    if (movies.length === 0) {
      return (
        <Col className="justify-content-center rounded-4 bg-body">
          No movies
        </Col>
      );
    }

    if (selectedMovie) {
      let genre = selectedMovie.genres[0].name;
      let similarMovies = movies
        .filter((movie) => {
          return movie.genres.some((el) => el.name.includes(genre));
        })
        .filter((movie) => movie.title !== selectedMovie.title);

      return (
        <Col md={8}>
          <MovieView
            movieData={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
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
        </Col>
      );
    }

    return (
      <Col md={10}>
        <div className="grid-container">
          {movies.map((movie) => {
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

        <Button
          className="btn-secondary"
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </Button>
      </Col>
    );
  };

  return <Row className="justify-content-md-center">{renderView()}</Row>;
};
