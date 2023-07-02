import { useEffect } from "react";
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
import { setUserData, setUserToken } from "../../redux/reducers/userData";
import { API } from "../../utils/links";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { getCookie } from "../../utils/cookies";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const userData = useSelector((state) => state.userData);
  const storedToken = getCookie("token");
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
          if (response.ok) {
            return response.json();
          } else {
            let contentType = response.headers.get("content-type");
            if (contentType.includes("text/html")) {
              response.text().then((info) => alert(info));
              throw "Error";
            } else if (contentType.includes("application/json")) {
              response.json().then((info) => {
                alert(info.errors.map((e) => e.msg).join("\n"));
              });
              throw "Error";
            }
          }
        })
        .then((data) => {
          dispatch(setUserData(data));
          dispatch(setUserToken(storedToken));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // if the token and user are there, fetch the movie list
  useEffect(() => {
    // only fetch list when token is there
    if (!userData.token) {
      return;
    }

    fetch(`${API}/movies`, {
      headers: { Authorization: `Bearer ${userData.token}` },
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
  }, [userData.token]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className="justify-content-center g-0 p-sm-4">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {userData.token ? (
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
                {userData.token ? (
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
                {!userData.token ? (
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
                {!userData.token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <NoDataInfo />
                ) : (
                  <Col sm={10} md={8} lg={6} className="bg-body rounded-4">
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
                  <Col sm={10} md={8} lg={6} className="bg-body rounded-4">
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
                {!userData.token ? (
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
