import propTypes from "prop-types";

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
