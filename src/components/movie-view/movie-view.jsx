export const MovieView = ({ movieData, onBackClick }) => {
    return (
    <div>
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
      <button onClick={onBackClick}>Go back</button>
    </div>
    );
};