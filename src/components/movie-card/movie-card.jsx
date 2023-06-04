export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
    <div onClick={() => onMovieClick(movieData)}>
      <div>
        {/* <img src={movieData.image} /> */}
      </div>
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