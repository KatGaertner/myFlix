import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { NoDataInfo } from "./noData-info";
import { MovieGrid } from "../movie-grid/movie-grid";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { API } from "../../utils/links";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const movies = useSelector((state) => state.movies.list);
  const userData = useSelector((state) => state.userData);

  const loggedIn = () => (Object.keys(userData).length === 0 ? false : true);

  useEffect(() => {
    console.log(userData);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    // only fetch list when token is there
    if (!token) {
      return;
    }

    fetch(`${API}/movies`, {
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
        dispatch(setMovies(moviesFromAPI));
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className="justify-content-center g-0 p-sm-4">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {loggedIn() ? (
                  <Navigate to="/" />
                ) : (
                  <Col sm={10} md={8} lg={6} className="rounded-4 bg-body">
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
                {loggedIn() ? (
                  <Navigate to="/" />
                ) : (
                  <Col sm={8} md={6} lg={4} className="rounded-4 bg-body">
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieID"
            element={
              <>
                {!loggedIn() ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <NoDataInfo />
                ) : (
                  <Col sm={10} md={8} lg={6} className="bg-body rounded-4">
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/directors/:directorName"
            element={
              <>
                {!loggedIn() ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <NoDataInfo />
                ) : (
                  <Col sm={10} md={8} lg={6} className="bg-body rounded-4">
                    <DirectorView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/genres/:genreName"
            element={
              <>
                {!loggedIn() ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <NoDataInfo />
                ) : (
                  <Col sm={10} md={8} lg={6} className="bg-body rounded-4">
                    <GenreView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!loggedIn() ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <NoDataInfo />
                ) : (
                  <Col md={10} lg={8} className="bg-body rounded-4 p-2">
                    <MovieGrid />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!loggedIn() ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col sm={10} md={8} lg={6} className="bg-body rounded-4">
                    <ProfileView />
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
