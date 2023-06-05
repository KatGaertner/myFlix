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
  movie: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    summary: propTypes.string,
    directors: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string.isRequired,
      description: propTypes.string
    })).isRequired,
    featured: propTypes.bool,
    genres: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string.isRequired,
      description: propTypes.string
    })).isRequired,
    imageURL: propTypes.string.isRequired,
  }).isRequired,
  onMovieClick: propTypes.func.isRequired,
};
