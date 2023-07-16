import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { NoDataInfo } from "./noData-info";
import { LoadingInfo } from "./loading-info";
import { MovieGrid } from "../movie-grid/movie-grid";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { loginUser } from "../../redux/reducers/userData";
import { API } from "../../utils/links";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { useState } from "react";
import { checkAuth } from "../../utils/fetchErrorHandlers";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const userData = useSelector((state) => state.userData);
  const storedToken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  // if a token is stored, but the userData state is empty, get userData from API
  useEffect(() => {
    if (storedToken && !userData.token) {
      fetch(`${API}/users/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          checkAuth(response);
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          dispatch(
            loginUser({
              userData: data,
              token: storedToken,
            })
          );
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, []);

  // if the token and user are there, fetch the movie list
  useEffect(() => {
    // only fetch list when token is there
    if (!userData.token) {
      setIsLoading(false);
      return;
    }

    fetch(`${API}/movies`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((response) => {
        checkAuth(response);
        return response.json();
      })
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [userData.token]);

  return (
    <>
      <BrowserRouter>
        <NavigationBar isLoading={isLoading} />
        <Row className="justify-content-center g-0 p-sm-4">
          {isLoading ? (
            <LoadingInfo />
          ) : (
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {userData.token ? (
                      <Navigate to="/" />
                    ) : (
                      <Col sm={10} md={8} lg={6} className="content-container">
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
                    {userData.token ? (
                      <Navigate to="/" />
                    ) : (
                      <Col sm={8} md={6} lg={4} className="content-container">
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
                    {!userData.token ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <NoDataInfo />
                    ) : (
                      <Col sm={10} md={8} lg={6} className="content-container">
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
                    {!userData.token ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <NoDataInfo />
                    ) : (
                      <Col sm={10} md={8} lg={6} className="content-container">
                        <DirectorView />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/genres/:genreName"
                element={
                  <>
                    {!userData.token ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <NoDataInfo />
                    ) : (
                      <Col sm={10} md={8} lg={6} className="content-container">
                        <GenreView />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!userData.token ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <NoDataInfo />
                    ) : (
                      <Col md={10} lg={8} className="content-container">
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
                    {!userData.token ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <Col sm={10} md={8} lg={6} className="content-container">
                        <ProfileView />
                      </Col>
                    )}
                  </>
                }
              />
            </Routes>
          )}
        </Row>
      </BrowserRouter>
    </>
  );
};
