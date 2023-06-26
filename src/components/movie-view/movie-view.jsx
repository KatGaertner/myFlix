import PropTypes from "prop-types";
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
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
