import propTypes from "prop-types";

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
  onMovieClick: propTypes.func.isRequired,
};
