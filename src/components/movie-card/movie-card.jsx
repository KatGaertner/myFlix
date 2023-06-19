import PropTypes from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movieData)}>
      <div>{/* <img src={movieData.image} /> */}</div>
      <div>
        <span>Title: </span>
        <span>{movieData.title}</span>
      </div>
      <div>
        <span>Author: </span>
        <span>{movieData.directors[0].name}</span>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
