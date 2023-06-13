import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Col, Row, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);

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
            <div class="grid-container">
              {similarMovies.map((movie) => {
                return (
                  <div class="mb-3" key={movie.id}>
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
        <div class="grid-container">
          {movies.map((movie) => {
            return (
              <div class="mb-3" key={movie.id}>
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

  return (
    <BrowserRouter>
      <NavigationBar
        user={user ? true : false}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center g-0">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col lg={7} xl={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col lg={7} xl={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieID"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col className="justify-content-center rounded-4 bg-body">
                    No movies
                  </Col>
                ) : (
                  <Col md={8} className="bg-body rounded-4">
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col className="justify-content-center rounded-4 bg-body">
                    No movies
                  </Col>
                ) : (
                  <Col md={10} className="bg-body rounded-4">
                    <div class="grid-container">
                      {movies.map((movie) => {
                        return (
                          <div class="mb-3" key={movie.id}>
                            <MovieCard movieData={movie} />
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
