import propTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user }) => {
  return (
    <>
      <Row className="rounded-4 bg-body">
        <div>{user.name}</div>
        <div>{user.email}</div>
      </Row>
    </>
  );
};
