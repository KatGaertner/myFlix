import PropTypes from "prop-types";

export const MovieView = ({ movieData, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movieData.imageURL} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movieData.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movieData.directors[0].name}</span>
      </div>
      <div>
        <span>Summary: </span>
        <span>{movieData.summary}</span>
      </div>
      <div>
        <span>Genres: </span>
        <span>{movieData.genres[0].name}</span>
      </div>
      <button onClick={onBackClick}>Go back</button>
    </div>
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
