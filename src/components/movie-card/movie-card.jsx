import propTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavButton } from "../fav-button/fav-button";

export const MovieCard = ({ movieData }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movieData.imageURL} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{movieData.title}</Card.Title>
          <Card.Text>{movieData.directors[0].name}</Card.Text>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <FavButton movieID={movieData.id} />
          <Link to={`/movies/${movieData.id}`}>
            <Button variant="link">See more</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: propTypes.shape({
    title: propTypes.string.isRequired,
    directors: propTypes.arrayOf(
      propTypes.shape({
        name: propTypes.string.isRequired,
      })
    ).isRequired,
    imageURL: propTypes.string.isRequired,
  }).isRequired,
};
