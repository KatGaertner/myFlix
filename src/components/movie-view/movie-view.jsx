import propTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";

export const MovieView = ({ movieData, onBackClick }) => {
  return (
    <Row className="rounded-4 bg-body">
      <Col sm={{ span: 4, order: "last" }}>
        <img className="w-100 d-none d-sm-block" src={movieData.imageURL} />
      </Col>
      <Col className="d-flex flex-column justify-content-between">
        <div>
          <h1>{movieData.title}</h1>
          <h2>{movieData.directors[0].name}</h2>
          <div>{movieData.summary}</div>
          <div class="text-end">{movieData.genres[0].name}</div>
        </div>
        <div>
          <Button className="mb-3" type="link" onClick={onBackClick}>
            Go back
          </Button>
        </div>
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movieData: propTypes.shape({
    title: propTypes.string.isRequired,
    summary: propTypes.string,
    directors: propTypes.arrayOf(
      propTypes.shape({
        name: propTypes.string.isRequired,
      })
    ).isRequired,
    genres: propTypes.arrayOf(
      propTypes.shape({
        name: propTypes.string.isRequired,
      })
    ).isRequired,
    imageURL: propTypes.string.isRequired,
  }).isRequired,
  onBackClick: propTypes.func.isRequired,
};
