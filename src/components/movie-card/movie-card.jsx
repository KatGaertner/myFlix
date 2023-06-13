import propTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movieData.imageURL} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{movieData.title}</Card.Title>
          <Card.Text>{movieData.directors[0].name}</Card.Text>
        </div>
        <div class="text-end">
          <Button onClick={() => onMovieClick(movieData)} variant="link">
            See more
          </Button>
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
  onMovieClick: propTypes.func.isRequired,
};
